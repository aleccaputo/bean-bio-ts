import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import type {PreferencesState} from "../../ducks/preferencesDuck";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import deeporange from '@material-ui/core/colors/deepOrange';
import type {UserState} from "../../ducks/userDuck";
import PersonalPreferences from "../../components/personl-preferences";
import ActionButtons from "../../components/action-buttons";
import {savePreferencesToDb, preferencesFetchReset} from "../../ducks/preferencesDuck";
import {useHistory} from 'react-router-dom';
import {HOME} from "../../workflow";

const useStyles = makeStyles(theme => ({
   paper: {
       marginTop: theme.spacing(10),
       paddingBottom: theme.spacing(2)
   }
}));

const Profile = () => {
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const user: UserState = useSelector(state => state.user);
    const [currentPreferences, setCurrentPreferences] = useState(preferences);
    const [hasClickedSave, setHasClickedSave] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const savePreferences = () => {
        setHasClickedSave(true);
        dispatch(savePreferencesToDb({...currentPreferences, userId: user.id}));
    };

    useEffect(() => {
        if(preferences.fetchSuccess && hasClickedSave) {
            dispatch(preferencesFetchReset());
            history.push(HOME);
        }
    }, [preferences, hasClickedSave]);
    return (
        <Paper className={classes.paper}>
            <PersonalPreferences updateFunction={setCurrentPreferences} currentState={currentPreferences}/>
            <ActionButtons primaryAction={savePreferences} primaryButtonText={'Save'}/>
        </Paper>
    )
};

export default Profile;