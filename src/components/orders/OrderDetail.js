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
import { useGetOrderById } from '../../api/hooks';
import { attachImageToOrder } from '../../api/db';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputFile: {
    display: 'none',
  },
}));

export default function OrderDetail() {
  const classes = useStyles();
  let { id } = useParams();
  const { data, isLoading, isError } = useGetOrderById(id);
  const [state, setState] = useState(data);

  useEffect(() => {
    if (data && data._attachments) {
      console.log(Object.keys(data._attachments));
    }
    setState(data);
  }, [data]);

  const handleToggle = (task) => (event) => {
    console.log('Task: ', task.id, ', done: ', event.target.checked);

    setState({
      ...state,
      tasks: state.tasks.map((item) =>
        task.id === item.id
          ? { ...item, done: event.target.checked }
          : item,
      ),
    });
  };

  const onChangeImageUpload = async (event) => {
    const element = document.getElementById('icon-button-file');
    if (element.files && element.files[0]) {
      const file = element.files[0];
      const result = await attachImageToOrder(state._id, file);
      setState(result);
      console.log(result);
    }
  };

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && (
        <Typography variant="subtitle1">Order not found</Typography>
      )}
      {state && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{state.description}</Typography>
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
              <List subheader={<ListSubheader>Tasks</ListSubheader>}>
                {state.tasks.map((task) => (
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
                capture
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
                  <ListSubheader component="div">
                    Pictures
                  </ListSubheader>
                </GridListTile>
                {state._attachments &&
                  Object.keys(state._attachments).map((fileName) => (
                    <GridListTile key={fileName} cols={1}>
                      <img
                        src={URL.createObjectURL(
                          state._attachments[fileName].data,
                        )}
                        alt={fileName}
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
