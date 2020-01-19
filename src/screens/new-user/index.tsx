import React, {useEffect, useState} from 'react';
import {TextField, Button, Typography, Paper, MenuItem, Theme} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {saveUserToDb, User} from '../../ducks/userDuck';
import ContentLayout from '../../components/content-layout';
import {useHistory} from 'react-router-dom';
import {WorkflowTypeEnum} from '../../workflow';
import ReactGA from 'react-ga';
import {makeStyles} from "@material-ui/styles";
import StateSelector from "../../components/state-selector";
import {RootState} from "../../store";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    select: {
        minWidth: 200,
        textAlign: 'left'
    }
}));

const NewUser = () => {
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formUser, setFormUser] = useState<User>({firstName: '', lastName: '', id: 1, state: '', city: ''});
    const formIsValid = formUser.lastName && formUser.lastName && formUser.state && formUser.city;
    const classes = useStyles();

    useEffect(() => {
        if (userState.fetchSuccess && userState.firstName && userState.lastName) {
            history.push(WorkflowTypeEnum.INITIAL_PREFERENCES)
        }
    }, [userState.fetchSuccess, userState.firstName, userState.lastName, history]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const updateUsersState = (state: string) => setFormUser({...formUser, state});

    return (
        <Paper className={classes.paper}>
            <ContentLayout spacing={2}>
                <Typography variant={'h5'}>{'Welcome to Bean Bio'}</Typography>
                <Typography>{'Please enter some basic information.'}</Typography>
                <TextField
                    label={'First Name'}
                    value={formUser.firstName}
                    onChange={e => setFormUser({...formUser, firstName: e.target.value})}
                />
                <TextField
                    label={'Last Name'}
                    value={formUser.lastName}
                    onChange={e => setFormUser({...formUser, lastName: e.target.value})}
                />
                <StateSelector
                    currentState={formUser.state || ''}
                    className={classes.select}
                    updateState={updateUsersState}
                />
                <TextField
                    label={'City'}
                    value={formUser.city}
                    onChange={e => setFormUser({...formUser, city: e.target.value})}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    disabled={userState.isFetching || !formIsValid}
                    onClick={() => dispatch(saveUserToDb(formUser))}
                >
                    {'Save'}
                </Button>
            </ContentLayout>
        </Paper>
    )
};

export default NewUser;