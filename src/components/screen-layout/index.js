import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.background.default,
        height: '100vh',
        overflow: 'scroll'
    }
}));
const ScreenLayout = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            {children}
        </div>
    )
};

export default ScreenLayout;