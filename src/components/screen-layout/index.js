import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.background.default,
        height: 'calc(100vh - 60px)',
        overflowX: 'hidden'
}
}));
const ScreenLayout = ({children}) => {
    const classes = useStyles();
    return (
        <main className={classes.background}>
            {children}
        </main>
    )
};

export default ScreenLayout;