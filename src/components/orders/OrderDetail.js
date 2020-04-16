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
} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
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
                accept="image/*"
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
                  key="Subheader"
                  cols={3}
                  style={{ height: 'auto' }}
                >
                  <ListSubheader component="div" color="primary">
                    Pictures
                  </ListSubheader>
                </GridListTile>
                {images &&
                  images.map((image) => (
                    <GridListTile key={image._id} cols={1}>
                      <img
                        src={URL.createObjectURL(
                          image._attachments.file.data,
                        )}
                        alt={image.name}
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
