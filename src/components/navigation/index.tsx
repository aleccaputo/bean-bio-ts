import React, {ReactNode} from 'react';
import {BottomNavigation, BottomNavigationAction, AppBar, Toolbar, Typography} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory, useRouteMatch, useLocation} from 'react-router-dom';
import {WorkflowTypeEnum} from '../../workflow';
import {makeStyles} from '@material-ui/styles';

const getPageTitle = (pathName: WorkflowTypeEnum) => {
    switch (pathName) {
        case WorkflowTypeEnum.HOME:
            return 'Home';
        case WorkflowTypeEnum.MY_COFFEES:
            return 'My Coffees';
        case WorkflowTypeEnum.NEW_COFFEE:
            return 'New Coffee';
        case WorkflowTypeEnum.PROFILE:
            return 'Profile';
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

interface Props {
    children: ReactNode
}
const Navigation = ({children}: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const homeRoute = useRouteMatch(WorkflowTypeEnum.HOME);
    const myCoffeesRoute = useRouteMatch(WorkflowTypeEnum.MY_COFFEES);
    const profileRoute = useRouteMatch(WorkflowTypeEnum.PROFILE);
    const location = useLocation();

    const route = location.pathname as WorkflowTypeEnum;
    const pageTitle = getPageTitle(route);
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
                <BottomNavigationAction label={'Profile'} icon={<AccountCircleIcon color={profileRoute && profileRoute.isExact ? 'secondary' : 'inherit'}/>} onClick={() => history.push(WorkflowTypeEnum.PROFILE)}/>
                <BottomNavigationAction label={'Home'} icon={<HomeIcon color={homeRoute && homeRoute.isExact ? 'secondary' : 'inherit'}/>} onClick={() => history.push(WorkflowTypeEnum.HOME)}/>
                <BottomNavigationAction label={'My Coffees'} icon={<ListIcon color={myCoffeesRoute && myCoffeesRoute.isExact ? 'secondary' : 'inherit'}/>} onClick={() => history.push(WorkflowTypeEnum.MY_COFFEES)}/>
            </BottomNavigation>
        </>
    )
};

export default Navigation;