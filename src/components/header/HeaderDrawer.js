import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 180,
  },
}));

export default function HeaderDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
        <ListItemLink
          to="/orders"
          primary="Orders"
          icon={<AssignmentIcon />}
        />
      </List>
    </div>
  );
}
