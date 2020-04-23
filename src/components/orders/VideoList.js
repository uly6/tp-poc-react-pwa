import React, { useState, useContext } from 'react';
import {
  makeStyles,
  IconButton,
  Paper,
  Grid,
  ListSubheader,
  GridList,
  GridListTile,
  GridListTileBar,
  Backdrop,
} from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import DeleteIcon from '@material-ui/icons/Delete';
import { useGetVideosByOrderId } from './hooks';
import { addVideo, deleteVideo } from '../../api/db';
import { SnackBarContext } from '../../context/SnackBarProvider';

const useStyles = makeStyles((theme) => ({
  inputFile: {
    display: 'none',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backdropContent: {
    maxWidth: '95%',
    maxHeight: '95%',
  },
}));

export default function VideoList({ orderId }) {
  const classes = useStyles();

  const { showSuccessAlert, showErrorAlert } = useContext(
    SnackBarContext,
  );

  const [videos, isLoading, isError, reload] = useGetVideosByOrderId(
    orderId,
    [],
  );
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const handleClose = () => {
    setSelectedVideo('');
    setOpen(false);
  };

  const handleOpenVideo = (video) => () => {
    // clicked video
    setSelectedVideo(video);
    // open backdrop
    setOpen(!open);
  };

  const onChangeVideoUpload = async (event) => {
    try {
      const element = document.getElementById('input-video-file');
      if (element.files && element.files[0]) {
        await addVideo(orderId, element.files[0]);
        reload();
        // show message
        showSuccessAlert('Video uploaded');
      }
    } catch (err) {
      showErrorAlert(`Error uploading video (${err.message})`);
    }
  };

  const handleDeleteVideo = (video) => async (event) => {
    try {
      // delete
      await deleteVideo(video);
      // reload videos
      reload();
      // show message
      showSuccessAlert('Video removed');
    } catch (err) {
      showErrorAlert(`Error removing video (${err.message})`);
    }
  };

  return (
    <>
      {/* BACKDROP */}

      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleClose}
      >
        {selectedVideo && (
          <video controls className={classes.backdropContent}>
            <source src={selectedVideo} />
            <p>This browser does not support the video element</p>
          </video>
        )}
      </Backdrop>

      {/* ACTIONS */}

      <Grid item container xs={12} direction="row" justify="flex-end">
        <Grid item>
          <input
            type="file"
            accept="video/*"
            id="input-video-file"
            className={classes.inputFile}
            onChange={onChangeVideoUpload}
          />
          <label htmlFor="input-video-file">
            <IconButton color="primary" component="span">
              <VideocamIcon />
            </IconButton>
          </label>
        </Grid>
      </Grid>

      {/* LIST */}

      <Grid item xs={12}>
        <Paper elevation={1}>
          <GridList cellHeight={180} cols={3}>
            <GridListTile
              key="subheader-video"
              cols={3}
              style={{ height: 'auto' }}
            >
              <ListSubheader
                component="div"
                color="primary"
                style={{ backgroundColor: '#E5E5E5' }}
              >
                Videos
                {!isLoading && videos.length === 0
                  ? ' (No items to display)'
                  : ''}
                {isLoading ? ' (Loading...)' : ''}
                {isError ? ' (Error loading videos)' : ''}
              </ListSubheader>
            </GridListTile>
            {videos &&
              videos.map((video) => {
                const videoURL = URL.createObjectURL(
                  video._attachments.file.data,
                );
                return (
                  <GridListTile
                    key={video._id}
                    cols={1}
                    onClick={handleOpenVideo(videoURL)}
                  >
                    <video height={180} controls={false}>
                      <source
                        type={video._attachments.file.content_type}
                        src={videoURL}
                      />
                      <p>
                        This browser does not support the video
                        element
                      </p>
                    </video>
                    <GridListTileBar
                      title={video.name}
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          onClick={handleDeleteVideo(video)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                );
              })}
          </GridList>
        </Paper>
      </Grid>
    </>
  );
}
