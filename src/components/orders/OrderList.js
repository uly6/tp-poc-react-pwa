import React, { useState, useEffect } from 'react';
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
import { getOrders } from '../../api/db';

export default function OrderList() {
  const { url } = useRouteMatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  // orders
  async function fetchOrders() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await getOrders();
      setOrders(response);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

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
