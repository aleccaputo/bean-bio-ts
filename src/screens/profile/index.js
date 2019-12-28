// @flow
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {Preferences, PreferencesState} from "../../ducks/preferencesDuck";
import {Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import deeporange from '@material-ui/core/colors/deepOrange';
import type {User, UserState} from "../../ducks/userDuck";
import PersonalPreferences from "../../components/personl-preferences";
import ActionButtons from "../../components/action-buttons";
import {savePreferencesToDb, preferencesFetchReset} from "../../ducks/preferencesDuck";
import {useHistory} from 'react-router-dom';
import {HOME} from "../../workflow";
import ContentLayout from "../../components/content-layout";
import StateSelector from "../../components/state-selector";
import {saveUserToDb} from "../../ducks/userDuck";

const useStyles = makeStyles(theme => ({
    paper: {
       marginTop: theme.spacing(10),
       paddingBottom: theme.spacing(2)
    },
    input: {
        textAlign: 'left',
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    }
}));

const Profile = () => {
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const user: UserState = useSelector(state => state.user);
    const [currentPreferences, setCurrentPreferences] = useState<Preferences>(preferences);
    const [currentUser, setCurrentUser] = useState<User>(user);
    const [hasClickedSave, setHasClickedSave] = useState<boolean>(false);

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const saveProfile = () => {
        setHasClickedSave(true);
        dispatch(savePreferencesToDb({...currentPreferences, userId: user.id}));
        dispatch(saveUserToDb(currentUser));
    };

    useEffect(() => {
        if(preferences.fetchSuccess && hasClickedSave) {
            dispatch(preferencesFetchReset());
            history.push(HOME);
        }
    }, [preferences, hasClickedSave, dispatch, history]);

    const updateUsersState = (state: string) => setCurrentUser({...currentUser, state});

    return (
        <Paper className={classes.paper}>
            <ContentLayout spacing={2}>
                <TextField
                    className={classes.input}
                    value={currentUser.firstName}
                    label={'First Name'}
                    fullWidth={true}
                    onChange={e => setCurrentUser({...currentUser, firstName: e.target.value})}
                />
                <TextField
                    className={classes.input}
                    value={currentUser.lastName}
                    label={'Last Name'}
                    fullWidth={true}
                    onChange={e => setCurrentUser({...currentUser, lastName: e.target.value})}
                />
                <StateSelector
                    className={classes.input}
                    currentState={currentUser.state}
                    updateState={updateUsersState}
                />
                <TextField
                    className={classes.input}
                    value={currentUser.city}
                    label={'City'}
                    fullWidth={true}
                    onChange={e => setCurrentUser({...currentUser, city: e.target.value})}
                />
            </ContentLayout>
            <PersonalPreferences updateFunction={setCurrentPreferences} currentState={currentPreferences}/>
            <ActionButtons primaryAction={saveProfile} primaryButtonText={'Save'}/>
        </Paper>
    )
};

export default Profile;