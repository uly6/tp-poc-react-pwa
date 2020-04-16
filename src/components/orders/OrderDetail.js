import React, { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Paper,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useParams } from 'react-router-dom';
import {
  addImage,
  getOrderById,
  getImagesByOrderId,
} from '../../api/db';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputFile: {
    display: 'none',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function OrderDetail() {
  const classes = useStyles();
  let { id } = useParams();

  // states
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState();
  const [images, setImages] = useState([]);

  // order
  async function fetchOrderById(id) {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getOrderById(id);
      setOrder(response);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  }

  // images
  async function fetchImagesByOrderId(orderId) {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getImagesByOrderId(orderId);
      console.log(response);
      setImages(response);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrderById(id);
  }, []);

  useEffect(() => {
    fetchImagesByOrderId(id);
  }, []);

  const handleToggle = (task) => (event) => {
    console.log('Task: ', task.id, ', done: ', event.target.checked);

    setOrder({
      ...order,
      tasks: order.tasks.map((item) =>
        task.id === item.id
          ? { ...item, done: event.target.checked }
          : item,
      ),
    });
  };

  const onChangeImageUpload = async (event) => {
    const element = document.getElementById('icon-button-file');
    if (element.files && element.files[0]) {
      const result = await addImage(order._id, element.files[0]);
      setImages([...images, result]);
    }
  };

  const onClickMap = (data) => (event) => {
    console.log('==>> onClickMap', data);

    if (!data) {
      return;
    }

    const { lat, lng } = data;

    if (['iPhone', 'iPad', 'iPod'].includes(navigator.platform)) {
      const win = window.open(
        `maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`,
        '_top',
      );
      return win.focus();
    }
    /* default to Google */
    const win = window.open(
      `https://maps.google.com/maps?q=${lat},${lng}`,
      '_blank',
    );
    return win.focus();
  };

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !order && (
        <Typography variant="subtitle1">Order not found</Typography>
      )}
      {order && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{order.description}</Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="row"
            justify="flex-end"
          >
            <Grid item>
              <IconButton color="primary" component="span">
                <PlaylistAddIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <List
                subheader={
                  <ListSubheader color="primary">Tasks</ListSubheader>
                }
              >
                {order.tasks.map((task) => (
                  <ListItem key={task.id}>
                    <ListItemText primary={task.description} />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle(task)}
                        checked={task.done}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* IMAGES */}

          <Grid
            item
            container
            xs={12}
            direction="row"
            justify="flex-end"
          >
            <Grid item>
              <input
                type="file"
                accept="image/*,video/*"
                id="icon-button-file"
                className={classes.inputFile}
                onChange={onChangeImageUpload}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                  <AddAPhotoIcon />
                </IconButton>
              </label>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={1}>
              <GridList cellHeight={180} cols={3}>
                <GridListTile
                  key="Subheader-image"
                  cols={3}
                  style={{ height: 'auto' }}
                >
                  <ListSubheader component="div" color="primary">
                    Images
                  </ListSubheader>
                </GridListTile>

                {images &&
                  images
                    .filter((image) =>
                      image._attachments.file.content_type.includes(
                        'image/',
                      ),
                    )
                    .map((image) => (
                      <GridListTile key={image._id} cols={1}>
                        <img
                          src={URL.createObjectURL(
                            image._attachments.file.data,
                          )}
                          alt={image.name}
                        />
                        <GridListTileBar
                          title={image.name}
                          subtitle={
                            image.location
                              ? `${image.location.lat}, ${image.location.lng}`
                              : 'No location'
                          }
                          actionIcon={
                            image.location ? (
                              <IconButton
                                className={classes.icon}
                                onClick={onClickMap(image.location)}
                              >
                                <LocationOnIcon />
                              </IconButton>
                            ) : null
                          }
                        />
                      </GridListTile>
                    ))}

                {/* VIDEOS */}

                <GridListTile
                  key="Subheader-video"
                  cols={3}
                  style={{ height: 'auto' }}
                >
                  <ListSubheader component="div" color="primary">
                    Videos
                  </ListSubheader>
                </GridListTile>
                {images &&
                  images
                    .filter((image) =>
                      image._attachments.file.content_type.includes(
                        'video/',
                      ),
                    )
                    .map((image) => (
                      <GridListTile key={image._id} cols={1}>
                        <video
                          height={180}
                          controls
                          src={URL.createObjectURL(
                            image._attachments.file.data,
                          )}
                        />
                      </GridListTile>
                    ))}
              </GridList>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
