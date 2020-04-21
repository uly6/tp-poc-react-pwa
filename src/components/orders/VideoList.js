import React from 'react';
import {
  makeStyles,
  IconButton,
  Paper,
  Grid,
  ListSubheader,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import DeleteIcon from '@material-ui/icons/Delete';
import { useGetVideosByOrderId } from './hooks';
import { addVideo, deleteVideo } from '../../api/db';

const useStyles = makeStyles((theme) => ({
  inputFile: {
    display: 'none',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function VideoList({ orderId }) {
  const classes = useStyles();

  const [videos, isLoading, isError, reload] = useGetVideosByOrderId(
    orderId,
    [],
  );

  const onChangeImageUpload = async (event) => {
    const element = document.getElementById('input-video-file');
    if (element.files && element.files[0]) {
      await addVideo(orderId, element.files[0]);
      reload();
    }
  };

  const handleDeleteVideo = (video) => async (event) => {
    // delete
    await deleteVideo(video);
    // reload videos
    reload();
  };

  return (
    <>
      {/* ACTIONS */}

      <Grid item container xs={12} direction="row" justify="flex-end">
        <Grid item>
          <input
            type="file"
            accept="video/*"
            id="input-video-file"
            className={classes.inputFile}
            onChange={onChangeImageUpload}
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
              videos.map((image) => (
                <GridListTile key={image._id} cols={1}>
                  <video
                    height={180}
                    controls={false}
                    src={URL.createObjectURL(
                      image._attachments.file.data,
                    )}
                  />
                  <GridListTileBar
                    title={image.name}
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        onClick={handleDeleteVideo(image)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </Paper>
      </Grid>
    </>
  );
}
