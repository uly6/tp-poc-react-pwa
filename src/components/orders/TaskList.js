import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Paper, Switch, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext, useState } from 'react';
import { addTask, deleteTask, updateTask } from '../../api/db';
import { SnackBarContext } from '../../context/SnackBarProvider';
import { useGetTasksByOrderId } from './hooks';

export default function TaskList({ orderId }) {
  const { showSuccessAlert, showErrorAlert } = useContext(
    SnackBarContext,
  );
  const [tasks, isLoading, isError, reload] = useGetTasksByOrderId(
    orderId,
    [],
  );
  const [open, setOpen] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState(false);

  const onChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = async () => {
    try {
      // save task
      await addTask({
        orderId,
        description: newTaskDescription,
      });
      // close dialog
      handleClose();
      // reload tasks
      reload();
      // show message
      showSuccessAlert('Task added');
    } catch (err) {
      showErrorAlert(`Error addding task (${err.message})`);
    }
  };

  const handleCompleteTask = (task) => async (event) => {
    try {
      await updateTask({
        ...task,
        completed: event.target.checked,
      });
      reload();
    } catch (err) {
      showErrorAlert(`Error completiing task (${err.message})`);
    }
  };

  const handleDeleteTask = (task) => async (event) => {
    try {
      // delete task
      await deleteTask(task);
      // reload tasks
      reload();
      // show message
      showSuccessAlert('Task removed');
    } catch (err) {
      showErrorAlert(`Error removing task (${err.message})`);
    }
  };

  return (
    <>
      {/* ACTIONS */}

      <Grid item container xs={12} direction="row" justify="flex-end">
        <Grid item>
          <IconButton
            color="primary"
            component="span"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* DIALOG */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle style={{ backgroundColor: '#E5E5E5' }}>
          New Task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="description"
            label="Description"
            fullWidth
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* LIST */}

      <Grid item xs={12}>
        <Paper elevation={1}>
          <List
            subheader={
              <ListSubheader
                color="primary"
                style={{ backgroundColor: '#E5E5E5' }}
              >
                Tasks
                {!isLoading && tasks.length === 0
                  ? ' (No items to display)'
                  : ''}
                {isLoading ? ' (Loading...)' : ''}
                {isError ? ' (Error loading tasks)' : ''}
              </ListSubheader>
            }
          >
            {tasks &&
              tasks.map((task) => (
                <ListItem key={task._id}>
                  <Switch
                    edge="start"
                    onChange={handleCompleteTask(task)}
                    checked={task.completed}
                  />
                  <ListItemText primary={task.description} />
                  <ListItemSecondaryAction>
                    <IconButton onClick={handleDeleteTask(task)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Paper>
      </Grid>
    </>
  );
}
