import React from 'react'
import classes from "./NavigationItems.css";
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact={props.exact}>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders" exact={props.exact}>
        Orders
      </NavigationItem>
    ) : null}

    {!props.isAuthenticated ? (
      <NavigationItem link="/auth" exact={props.exact}>
        Authenticate
      </NavigationItem>
    ) : (
      <NavigationItem link="/logout" exact={props.exact}>
        Logout
      </NavigationItem>
    )}
  </ul>
);

export default navigationItems;