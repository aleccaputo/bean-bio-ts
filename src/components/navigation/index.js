import React from 'react';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HOME, MY_COFFEES} from '../../workflow';
import {makeStyles} from '@material-ui/styles';


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
                <BottomNavigationAction label={'Home'} icon={<HomeIcon/>} onClick={() => route && route.exact ? null : history.push(HOME)}/>
                <BottomNavigationAction label={'My Coffees'} icon={<ListIcon/>} onClick={() => history.push(MY_COFFEES)}/>
            </BottomNavigation>
        </>
    )
};

export default Navigation;