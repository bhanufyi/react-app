import React from 'react'
import classes from "./NavigationItems.css";
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>

        <NavigationItem link ='/' 
        exact ={props.exact}>
            Burger Builder
        </NavigationItem>
        <NavigationItem link='/orders'
        exact={props.exact}>
            Orders
        </NavigationItem>
        
    </ul>
);

export default navigationItems;