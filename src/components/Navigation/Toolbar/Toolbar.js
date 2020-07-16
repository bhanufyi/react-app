import React from 'react'
import classes from "./Toolbar.css"
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'


const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
        <Logo />
        </div>
        {/* <Logo height="80%"/> */}

        <nav className={classes.DekstopOnly}>
             <NavigationItems isAuthenticated={props.isAuth}/>
            
        </nav>
       
    </header>
);

export default toolbar;
