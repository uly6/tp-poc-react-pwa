import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Paper,
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
import { SnackBarContext } from '../../context/SnackBarProvider';

export default function Home() {
  const { showSuccessAlert, showErrorAlert } = useContext(
    SnackBarContext,
  );

  // load sync metadata
  const [syncMetadata, setSyncMetadata] = useState(
    DEFAULT_SYNC_METADATA,
  );

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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

      showSuccessAlert('Data loaded from server successfuly');
    } catch (err) {
      showErrorAlert('Error loading data from server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickUpload = async (event) => {
    try {
      setLoading(true);

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

      showSuccessAlert('Data synced back to server successfuly');
    } catch (err) {
      showErrorAlert('Error syncing data back to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickDelete = async (event) => {
    try {
      setLoading(true);

      // delete databases
      const result = await cleanDatabases();
      console.log(result);

      // restore sync metadata default
      setSyncMetadata(await getSyncMetadata());

      showSuccessAlert('Local database cleaned successfuly');
    } catch (err) {
      showErrorAlert('Error cleaning local database');
      console.error(err);
    } finally {
      setLoading(false);
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
            disabled={syncMetadata.downloadDisabled || loading}
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
            disabled={syncMetadata.uploadDisabled || loading}
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
            disabled={syncMetadata.deleteDisabled || loading}
          >
            Clean my local data
          </Button>
        </Grid>
        {loading && (
          <Grid
            item
            xs={12}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <CircularProgress size={40} style={{ marginTop: 50 }} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
