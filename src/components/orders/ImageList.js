import { Backdrop, Grid, GridList, GridListTile, GridListTileBar, IconButton, ListSubheader, makeStyles, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useContext, useState } from 'react';
import { addImage, deleteImage } from '../../api/db';
import { SnackBarContext } from '../../context/SnackBarProvider';
import { useGetImagesByOrderId } from './hooks';

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

export default function ImageList({ orderId }) {
  const classes = useStyles();

  const { showSuccessAlert, showErrorAlert } = useContext(
    SnackBarContext,
  );

  const [images, isLoading, isError, reload] = useGetImagesByOrderId(
    orderId,
    [],
  );
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenImage = (image) => () => {
    // clicked image
    setSelectedImage(image);
    // open backdrop
    setOpen(!open);
  };

  const onChangeImageUpload = async (event) => {
    try {
      const element = document.getElementById('input-image-file');
      if (element.files && element.files[0]) {
        await addImage(orderId, element.files[0]);
        reload();
        // show message
        showSuccessAlert('Image uploaded');
      }
    } catch (err) {
      showErrorAlert(`Error uploading image (${err.message})`);
    }
  };

  const handleDeleteImage = (image) => async (event) => {
    try {
      // delete
      await deleteImage(image);
      // reload images
      reload();
      // show message
      showSuccessAlert('Image removed');
    } catch (err) {
      showErrorAlert(`Error removing image (${err.message})`);
    }
  };

  // const onClickMap = (data) => (event) => {
  //   console.log('==>> onClickMap', data);

  //   if (!data) {
  //     return;
  //   }

  //   const { lat, lng } = data;

  //   if (['iPhone', 'iPad', 'iPod'].includes(navigator.platform)) {
  //     const win = window.open(
  //       `maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`,
  //       '_top',
  //     );
  //     return win.focus();
  //   }
  //   /* default to Google */
  //   const win = window.open(
  //     `https://maps.google.com/maps?q=${lat},${lng}`,
  //     '_blank',
  //   );
  //   return win.focus();
  // };

  return (
    <>
      {/* BACKDROP */}

      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleClose}
      >
        {selectedImage && (
          <img
            className={classes.backdropContent}
            src={selectedImage}
            alt=""
          />
        )}
      </Backdrop>

      {/* ACTIONS */}

      <Grid item container xs={12} direction="row" justify="flex-end">
        <Grid item>
          <input
            type="file"
            accept="image/*"
            id="input-image-file"
            className={classes.inputFile}
            onChange={onChangeImageUpload}
          />
          <label htmlFor="input-image-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
      </Grid>

      {/* LIST */}

      <Grid item xs={12}>
        <Paper elevation={1}>
          <GridList cellHeight={180} cols={3}>
            <GridListTile
              key="subheader-image"
              cols={3}
              style={{ height: 'auto' }}
            >
              <ListSubheader
                component="div"
                color="primary"
                style={{ backgroundColor: '#E5E5E5' }}
              >
                Images
                {!isLoading && images.length === 0
                  ? ' (No items to display)'
                  : ''}
                {isLoading ? ' (Loading...)' : ''}
                {isError ? ' (Error loading images)' : ''}
              </ListSubheader>
            </GridListTile>

            {images &&
              images.map((image) => {
                const imageURL = URL.createObjectURL(
                  image._attachments.file.data,
                );
                return (
                  <GridListTile
                    key={image._id}
                    cols={1}
                    onClick={handleOpenImage(imageURL)}
                  >
                    <img src={imageURL} alt={image.name} />
                    <GridListTileBar
                      title={image.name}
                      subtitle={
                        image.location
                          ? `${image.location.lat}, ${image.location.lng}`
                          : 'No location'
                      }
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          onClick={handleDeleteImage(image)}
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
