import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.background.default,
        height: 'calc(100vh - 60px)',
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