import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderById } from './hooks';
import ImageList from './ImageList';
import TaskList from './TaskList';
import VideoList from './VideoList';

export default function OrderDetail() {
  let { id } = useParams();

  // states
  const [order, isLoading, isError] = useGetOrderById(id);

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
          <TaskList orderId={id} />
          <ImageList orderId={id} />
          <VideoList orderId={id} />
        </Grid>
      )}
    </div>
  );
}
