import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import HeaderDrawer from './HeaderDrawer';
import { HeaderWifiIcon } from './HeaderWifiIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const iOS =
    process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (open !== value) {
      setOpen(value);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <SwipeableDrawer
          anchor="left"
          open={open}
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          <HeaderDrawer />
        </SwipeableDrawer>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Work App
          </Typography>
          <HeaderWifiIcon/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
