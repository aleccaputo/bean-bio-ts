import React, {useState} from 'react';
import type {UserState} from '../../ducks/userDuck';
import {useSelector} from 'react-redux';
import type {PreferencesState} from '../../ducks/preferencesDuck';
import {isNewUser} from '../../workflow';

const IsExistingUser = ({children}) => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    return !isNewUser(user, preferences) ? children : null
};

export default IsExistingUser;