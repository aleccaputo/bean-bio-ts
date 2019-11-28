import React from 'react';
import {BottomNavigation, BottomNavigationAction, AppBar, Toolbar, Typography} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory, useRouteMatch, useLocation} from 'react-router-dom';
import {HOME, MY_COFFEES, NEW_COFFEE} from '../../workflow';
import {makeStyles} from '@material-ui/styles';

const getPageTitle = (pathName) => {
    switch (pathName) {
        case HOME:
            return 'Home';
        case MY_COFFEES:
            return 'My Coffees';
        case NEW_COFFEE:
            return 'New Coffee';
        default:
            return '';
    }
}
const useStyles = makeStyles(theme => ({
    stickToBottom: {
        position: 'fixed',
        width: '100vw',
        bottom: 0
    },
    content: {
        marginTop: 60

    }
}));

const Navigation = ({children}) => {
    const classes = useStyles();
    const history = useHistory();
    const homeRoute = useRouteMatch(HOME);
    const myCoffeesRoute = useRouteMatch(MY_COFFEES);
    const location = useLocation();

    const pageTitle = getPageTitle(location.pathname);
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant={'h6'}>
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                {children}
            </div>
            <BottomNavigation className={classes.stickToBottom}>
                <BottomNavigationAction label={'Profile'} icon={<AccountCircleIcon/>}/>
                <BottomNavigationAction label={'Home'} icon={<HomeIcon color={homeRoute && homeRoute.isExact ? 'secondary' : 'inherit'}/>} onClick={() => history.push(HOME)}/>
                <BottomNavigationAction label={'My Coffees'} icon={<ListIcon color={myCoffeesRoute && myCoffeesRoute.isExact ? 'secondary' : 'inherit'}/>} onClick={() => history.push(MY_COFFEES)}/>
            </BottomNavigation>
        </>
    )
};

export default Navigation;