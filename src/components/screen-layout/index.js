import React from 'react';
import {makeStyles} from '@material-ui/core';
import {INITIAL_PREFERENCES, NEW_USER} from '../../workflow';

const useStyles = makeStyles(theme => ({
    background: props => ({
        backgroundColor: theme.palette.background.default,
        height: props.isNewUser ? '100vh' : 'calc(100vh - 56px)',
        overflowX: 'hidden'
    })
}));
const ScreenLayout = ({children}) => {
    const isNewUser = window.location.pathname === INITIAL_PREFERENCES || window.location.pathname === NEW_USER;
    const classes = useStyles({isNewUser});
    return (
        <main className={classes.background}>
            {children}
        </main>
    )
};

export default ScreenLayout;