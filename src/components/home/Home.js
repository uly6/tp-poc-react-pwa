import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchOrders, fetchTasksByOrderId } from '../../api/web';
import {
  addOrder,
  getSyncMetadata,
  DEFAULT_SYNC_METADATA,
  updateSyncMetadata,
  cleanDatabases,
  addTask,
  syncToRemote,
} from '../../api/db';

export default function Home() {
  // load sync metadata
  const [syncMetadata, setSyncMetadata] = useState(
    DEFAULT_SYNC_METADATA,
  );

  const [inProgress, setInProgress] = useState({
    loading: false,
    message: '',
    err: false,
  });

  useEffect(() => {
    async function fetchSyncMetadata() {
      try {
        const response = await getSyncMetadata();
        setSyncMetadata(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSyncMetadata();
  }, []);

  const onClickDownload = async (event) => {
    try {
      setInProgress({
        loading: true,
        message: 'Loading data from server',
      });

      // fetch data from web api
      const orders = await fetchOrders();

      if (orders.length > 0) {
        const ordersSavedToDb = await Promise.all(
          orders.map((order) =>
            // pouchdb needs an _id as key
            addOrder({ ...order, _id: order.id }),
          ),
        );

        const orderIds = ordersSavedToDb.map((order) => order._id);

        const tasks = await Promise.all(
          orderIds.map((orderId) => fetchTasksByOrderId(orderId)),
        );

        // pouchdb needs an _id as key
        await Promise.all(
          tasks
            .flat()
            .map((task) => addTask({ ...task, _id: addTask.id })),
        );

        // save metadata in the database
        const updatedMetadata = await updateSyncMetadata({
          ...syncMetadata,
          downloadDisabled: true,
          uploadDisabled: false,
          deleteDisabled: false,
        });

        // update sync metadata state
        setSyncMetadata(updatedMetadata);
      }

      setInProgress({
        loading: false,
        message: 'Loaded data from server successfuly',
      });
    } catch (err) {
      setInProgress({
        loading: false,
        error: true,
        message: 'Error loading data from server',
      });
      console.error(err);
    }
  };

  const onClickUpload = async (event) => {
    try {
      setInProgress({
        loading: true,
        message: 'Syncing data back to server',
      });

      await syncToRemote();

      // save metadata in the database
      const updatedMetadata = await updateSyncMetadata({
        ...syncMetadata,
        downloadDisabled: true,
        uploadDisabled: true,
        deleteDisabled: false,
      });

      // // update sync metadata state
      setSyncMetadata(updatedMetadata);

      setInProgress({
        loading: false,
        message: 'Data synced back to server successfuly',
      });
    } catch (err) {
      setInProgress({
        loading: false,
        error: true,
        message: 'Error syncing data back to server',
      });
      console.error(err);
    }
  };

  const onClickDelete = async (event) => {
    try {
      setInProgress({
        loading: true,
        message: 'Cleaning local database',
      });

      // delete databases
      const result = await cleanDatabases();
      console.log(result);

      // restore sync metadata default
      setSyncMetadata(await getSyncMetadata());

      setInProgress({
        loading: false,
        message: 'Local database cleaned successfuly',
      });
    } catch (err) {
      setInProgress({
        loading: false,
        error: true,
        message: 'Error cleaning local database',
      });
      console.error(err);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Home</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudDownloadIcon />}
            onClick={onClickDownload}
            disabled={syncMetadata.downloadDisabled}
          >
            Load data from server
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            onClick={onClickUpload}
            disabled={syncMetadata.uploadDisabled}
          >
            Sync local data to server
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="default"
            startIcon={<DeleteIcon />}
            onClick={onClickDelete}
            disabled={syncMetadata.deleteDisabled}
          >
            Clean my local data
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
