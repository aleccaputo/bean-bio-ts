import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {UserState} from '../../ducks/userDuck';
import {Typography, Button, Paper} from '@material-ui/core';
import type {Preferences, PreferencesState} from '../../ducks/preferencesDuck';
import {savePreferencesToDb} from '../../ducks/preferencesDuck';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {NEW_USER} from '../../workflow';
import ReactGA from 'react-ga';
import PersonalPreferences from "../../components/personl-preferences";
import ContentLayout from "../../components/content-layout";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

const UserPreferences = () => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [formPrefs: Preferences, setFormPrefs] = useState({
        roastLevel: preferences.roastLevel || '',
        brewMethod: preferences.brewMethod || '',
        origin: preferences.origin || '',
        company: preferences.company || ''
    });

    useEffect(() => {
        if(!user.firstName || !user.lastName) {
            history.push(NEW_USER);
        }
    }, [user.firstName, user.lastName, history]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    const formIsValid = formPrefs.roastLevel && formPrefs.company && formPrefs.brewMethod && formPrefs.roastLevel;

    return (
        <Paper className={classes.paper}>
            <ContentLayout spacing={2}>
                <Typography variant={'h5'}>{`Thanks, ${user.firstName}. Please select some initial preferences.`}</Typography>
                <PersonalPreferences currentState={formPrefs} updateFunction={setFormPrefs}/>
                <Button
                    align={'left'}
                    onClick={() => dispatch(savePreferencesToDb({...formPrefs, userId: user.id}))}
                    disabled={preferences.isFetching || !formIsValid}
                    color={'primary'}
                    variant={'contained'}
                >
                    {'Save'}
                </Button>
            </ContentLayout>
        </Paper>
        )
};

export default UserPreferences;