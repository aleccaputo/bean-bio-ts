import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {UserState} from '../../ducks/userDuck';
import type {PreferencesState} from '../../ducks/preferencesDuck';
import {CircularProgress} from '@material-ui/core';
import {fetchUserFromDb} from '../../ducks/userDuck';
import {fetchPreferencesFromDb} from '../../ducks/preferencesDuck';

const Init = ({children}) => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user.hasBeenInitialized && !user.isFetching) {
            dispatch(fetchUserFromDb(1));
        }
        if(!preferences.hasBeenInitialized && !preferences.isFetching) {
            dispatch(fetchPreferencesFromDb(1));
        }
    }, [dispatch, preferences.hasBeenInitialized, preferences.isFetching, user.hasBeenInitialized, user.isFetching]);
    return user.hasBeenInitialized && preferences.hasBeenInitialized ? children : <CircularProgress/>
};

export default Init;