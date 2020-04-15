import React from 'react';
import {
  Typography,
  IconButton,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link, useRouteMatch } from 'react-router-dom';
import { useGetOrders } from '../../api/hooks';

export default function OrderList() {
  const { url } = useRouteMatch();
  const { data, isLoading, isError } = useGetOrders();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Work Orders</Typography>
        </Grid>
        <Grid item xs={12}>
          {isError && <div>Something went wrong ...</div>}
          {isLoading && <div>Loading...</div>}
          {!isLoading && data.length === 0 && (
            <Typography variant="subtitle1">
              No orders to display
            </Typography>
          )}
          {data.length > 0 && (
            <Paper elevation={1}>
              <List>
                {data.map((order) => (
                  <ListItem
                    key={order.id}
                    button
                    component={Link}
                    to={`${url}/${order.id}`}
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
