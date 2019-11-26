import React from 'react';
import {BottomNavigation, BottomNavigationAction, makeStyles} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HOME, NEW_COFFEE} from '../../workflow';

const useStyles = makeStyles(theme => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0
    }
}));

const Navigation = ({children}) => {
    const classes = useStyles();
    const history = useHistory();
    const route = useRouteMatch(HOME);
    return (
        <>
            {children}
            <BottomNavigation className={classes.stickToBottom}>
                <BottomNavigationAction label={'Profile'} icon={<AccountCircleIcon/>}/>
                <BottomNavigationAction label={'New Coffee'} icon={<CoffeeIcon/>} onClick={() => history.push(NEW_COFFEE)}/>
                <BottomNavigationAction label={'My Coffees'} icon={<ListIcon/>}/>
                <BottomNavigationAction label={'Home'} icon={<HomeIcon/>} onClick={() => route && route.exact ? null : history.push(HOME)}/>
            </BottomNavigation>
        </>
    )
};

export default Navigation;