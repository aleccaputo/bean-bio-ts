import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Typography, Button, Paper, Theme} from '@material-ui/core';
import {savePreferencesToDb, Preferences} from '../../ducks/preferencesDuck';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';
import {WorkflowTypeEnum} from '../../workflow';
import ReactGA from 'react-ga';
import PersonalPreferences from "../../components/personl-preferences";
import ContentLayout from "../../components/content-layout";
import {RootState} from "../../store";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

const UserPreferences = () => {
    const user = useSelector((state: RootState) => state.user);
    const preferences = useSelector((state: RootState) => state.preferences);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [formPrefs, setFormPrefs] = useState<Preferences>({
        userId: user.id,
        roastLevel: preferences.roastLevel || '',
        brewMethod: preferences.brewMethod || '',
        origin: preferences.origin || '',
        company: preferences.company || ''
    });

    useEffect(() => {
        if(!user.firstName || !user.lastName) {
            history.push(WorkflowTypeEnum.NEW_USER);
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
                    onClick={() => dispatch(savePreferencesToDb(formPrefs))}
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