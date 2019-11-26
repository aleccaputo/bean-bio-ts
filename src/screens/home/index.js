import React, {useEffect} from 'react';
import type {UserState} from '../../ducks/userDuck';
import {useSelector} from 'react-redux';
import type {PreferencesState} from '../../ducks/preferencesDuck';
import {BottomNavigation, BottomNavigationAction, makeStyles} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HOME, INITIAL_PREFERENCES} from '../../workflow';
import ScreenLayout from '../../components/screen-layout';
import Navigation from '../../components/navigation';

const useStyles = makeStyles(() => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0
    }
}));
const Home = () => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const classes = useStyles();
    const history = useHistory();
    const route = useRouteMatch(INITIAL_PREFERENCES);
    useEffect(() => {
        if (route && route.path === INITIAL_PREFERENCES) {
            history.replace(HOME);
        }
    }, []);

    return (
        <ScreenLayout>
            <Navigation>

            </Navigation>
        </ScreenLayout>

    )
};

export default Home;