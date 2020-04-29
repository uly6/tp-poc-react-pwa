import { Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useGetOrders } from './hooks';

export default function OrderList() {
  const { url } = useRouteMatch();
  const [orders, isLoading, isError] = useGetOrders([]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Work Orders</Typography>
        </Grid>
        <Grid item xs={12}>
          {isError && <div>Something went wrong ...</div>}
          {isLoading && <div>Loading...</div>}
          {!isLoading && orders.length === 0 && (
            <Typography variant="subtitle1">
              No orders to display
            </Typography>
          )}
          {orders.length > 0 && (
            <Paper elevation={1}>
              <List>
                {orders.map((order) => (
                  <ListItem
                    key={order._id}
                    button
                    component={Link}
                    to={`${url}/${order._id}`}
                  >
                    <ListItemText
                      primary={order.description}
                      secondary={order.station}
                    />
                    <ListItemSecondaryAction>
                      <IconButton color="inherit">
                        <VisibilityIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
