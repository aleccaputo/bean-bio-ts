import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {UserState} from '../../ducks/userDuck';
import type {PreferencesState} from '../../ducks/preferencesDuck';
import {CircularProgress} from '@material-ui/core';
import {fetchUserFromDb} from '../../ducks/userDuck';
import {fetchPreferencesFromDb} from '../../ducks/preferencesDuck';

type Props = {
    db: any
}
const Init = ({db, children}: Props) => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user.hasBeenInitialized && !user.isFetching) {
            dispatch(fetchUserFromDb(1, db));
        }
        if(!preferences.hasBeenInitialized && !preferences.isFetching) {
            dispatch(fetchPreferencesFromDb(1, db));
        }
    }, [db, dispatch, preferences.hasBeenInitialized, preferences.isFetching, user.hasBeenInitialized, user.isFetching]);
    return user.hasBeenInitialized && preferences.hasBeenInitialized ? children : <CircularProgress/>
};

export default Init;