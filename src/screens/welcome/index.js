// @flow
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {UserState} from "../../ducks/userDuck";
import {fetchUserFromDb, userFetchReset} from '../../ducks/userDuck';
import {CircularProgress} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import type {PreferencesState} from '../../ducks/preferencesDuck';
import ReactGA from 'react-ga';

const Welcome = () => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const dispatch = useDispatch();
    const [isNewUser, setIsNewUser] = useState(null);

    useEffect(() => {
        if(!user.firstName || !user.lastName) {
            dispatch(fetchUserFromDb('foo'));
        }
        return () => dispatch(userFetchReset());
    }, [dispatch, user.firstName, user.lastName]);

    useEffect(() => {
        // no user, must be new!
        if(user.fetchSuccess) {
            if(!user.firstName || !user.lastName || !preferences.company || !preferences.origin || !preferences.brewMethod || !preferences.roastLevel) {
                setIsNewUser(true)
            } else {
                setIsNewUser(false);
            }
        }
    }, [preferences.brewMethod, preferences.company, preferences.origin, preferences.roastLevel, user.fetchSuccess, user.firstName, user.lastName]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (user.isFetching && user.fetchSuccess === null) || isNewUser === null ? <CircularProgress/> : isNewUser ? <Redirect to='/new-user'/> : <Redirect to={'/home'}/>
};

export default Welcome;