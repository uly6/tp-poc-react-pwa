import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import OrderIndex from './components/orders/OrderIndex';
import { SnackBarProvider } from './context/SnackBarProvider';

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
      <SnackBarProvider>
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
      </SnackBarProvider>
    </Router>
  );
}
