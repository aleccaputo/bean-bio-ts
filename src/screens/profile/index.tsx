import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Paper, TextField, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import PersonalPreferences from "../../components/personl-preferences";
import ActionButtons from "../../components/action-buttons";
import {savePreferencesToDb, preferencesFetchReset, Preferences} from "../../ducks/preferencesDuck";
import {useHistory} from 'react-router-dom';
import {WorkflowTypeEnum} from "../../workflow";
import ContentLayout from "../../components/content-layout";
import StateSelector from "../../components/state-selector";
import {saveUserToDb} from "../../ducks/userDuck";
import {RootState} from "../../store";

const useStyles = makeStyles((theme: Theme) => ({
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
    const preferences = useSelector((state: RootState) => state.preferences);
    const user = useSelector((state: RootState) => state.user);
    const [currentPreferences, setCurrentPreferences] = useState(preferences as Preferences);
    const [currentUser, setCurrentUser] = useState(user);
    const [hasClickedSave, setHasClickedSave] = useState(false);

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
            history.push(WorkflowTypeEnum.HOME);
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
                    currentState={currentUser.state || ''}
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