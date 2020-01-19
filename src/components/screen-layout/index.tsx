import React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {WorkflowTypeEnum} from '../../workflow';

const useStyles = makeStyles<Theme, {isNewUser: boolean}>((theme: Theme) => ({
    background: props => ({
        backgroundColor: theme.palette.background.default,
        height: props.isNewUser ? '100vh' : 'calc(100vh - 56px)',
        overflowX: 'hidden'
    })
}));

interface Props {
    children: React.ReactNode | React.ReactNodeArray
}
const ScreenLayout = ({children}: Props) => {
    const isNewUser = window.location.pathname === WorkflowTypeEnum.INITIAL_PREFERENCES || window.location.pathname === WorkflowTypeEnum.NEW_USER;
    const classes = useStyles({isNewUser});
    return (
        <main className={classes.background}>
            {children}
        </main>
    )
};

export default ScreenLayout;