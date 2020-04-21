import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './components/header/Header';
import OrderIndex from './components/orders/OrderIndex';
import Home from './components/home/Home';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: theme.spacing(2),
    // [theme.breakpoints.down("xs")]: {
    //   padding: theme.spacing(2),
    // },
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Router basename="/">
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <main className={classes.main}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/orders">
              <OrderIndex />
            </Route>
          </Switch>
        </main>
      </Container>
    </Router>
  );
}
