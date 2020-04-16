import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchOrders, fetchOrderById } from '../../api/web';
import {
  addOrder,
  getSyncMetadata,
  DEFAULT_SYNC_METADATA,
  updateSyncMetadata,
  deleteAllOrders,
} from '../../api/db';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  // const [downloadDisabled, setDownloadDisabled] = useState(false);
  // const [uploadDisabled, setUploadDisabled] = useState(true);
  // const [deleteDisabled, setDeleteDisabled] = useState(true);

  // load sync metadata
  const [syncMetadata, setSyncMetadata] = useState(
    DEFAULT_SYNC_METADATA,
  );

  useEffect(() => {
    async function fetchSyncMetadata() {
      try {
        const response = await getSyncMetadata();
        setSyncMetadata(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSyncMetadata();
  }, []);

  const [inProgress, setInProgress] = useState({
    loading: false,
    message: '',
    err: false,
  });

  const onClickDownload = async (event) => {
    setInProgress({
      loading: true,
      message: 'Loading work orders from server',
    });

    try {
      // fetch data from web api
      const orders = await fetchOrders();
      if (orders.length > 0) {
        setInProgress({
          message: `Loading tasks for ${orders.length} work orders from server`,
        });

        const ordersWithTasks = await Promise.all(
          orders.map((order) => fetchOrderById(order.id)),
        );

        setInProgress({
          message: 'Saving work orders to local database',
        });

        const savedToDb = await Promise.all(
          ordersWithTasks.map((order) => addOrder(order)),
        );

        console.log(savedToDb);

        setInProgress({
          message: 'Finishing to save to local database',
        });

        // save metadata in the database
        const updatedMetadata = await updateSyncMetadata({
          ...syncMetadata,
          downloadDisabled: true,
          uploadDisabled: false,
          deleteDisabled: false,
        });

        // update sync metadata state
        setSyncMetadata(updatedMetadata);

        setInProgress({
          loading: false,
          message: `Loaded ${ordersWithTasks.length} work orders and tasks successfuly`,
        });
      } else {
        setInProgress({
          loading: false,
          message: 'There are no work orders to load from server',
        });
      }
    } catch (err) {
      console.error(err);

      setInProgress({
        loading: false,
        error: true,
        message:
          'Error loading work orders from server. Please try again',
      });
    }
  };

  const onClickUpload = async (event) => {
    try {
      setInProgress({
        loading: true,
        message: 'Syncing work orders back to server',
      });

      setInProgress({
        message: 'Finishing sync back to server',
      });

      // save metadata in the database
      const updatedMetadata = await updateSyncMetadata({
        ...syncMetadata,
        downloadDisabled: true,
        uploadDisabled: true,
        deleteDisabled: false,
      });

      // update sync metadata state
      setSyncMetadata(updatedMetadata);

      setInProgress({
        loading: false,
        message: 'Work orders synced back to server successfuly',
      });
    } catch (err) {
      setInProgress({
        loading: false,
        error: true,
        message:
          'Error syncing work orders back to server. Please try again',
      });
    }
  };

  const onClickDelete = async (event) => {
    try {
      setInProgress({
        loading: true,
        message: 'Cleaning local database',
      });

      // delete database
      await deleteAllOrders();

      setInProgress({
        message: 'Finishing the cleaning of the local database',
      });

      // save metadata in the database
      const updatedMetadata = await updateSyncMetadata({
        ...syncMetadata,
        downloadDisabled: false,
        uploadDisabled: true,
        deleteDisabled: true,
      });

      // update sync metadata state
      setSyncMetadata(updatedMetadata);

      setInProgress({
        loading: false,
        message: 'Local database cleaned successfuly',
      });
    } catch (err) {
      setInProgress({
        loading: false,
        error: true,
        message:
          'Error cleaning the local database. Please try again',
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Home</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudDownloadIcon />}
            onClick={onClickDownload}
            disabled={syncMetadata.downloadDisabled}
          >
            Download
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={onClickUpload}
            disabled={syncMetadata.uploadDisabled}
          >
            Upload (Not Working)
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={onClickDelete}
            disabled={syncMetadata.deleteDisabled}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={12}>
          {inProgress.loading && <CircularProgress size={17} />}
          {'  '}
          {inProgress.message && <span>{inProgress.message}</span>}
        </Grid>
      </Grid>
    </div>
  );
}
