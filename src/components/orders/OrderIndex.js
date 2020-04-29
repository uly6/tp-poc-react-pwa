import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import OrderDetail from './OrderDetail';
import OrderList from './OrderList';

export default function OrderRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <OrderList />
      </Route>
      <Route path={`${path}/:id`}>
        <OrderDetail />
      </Route>
    </Switch>
  );
}
