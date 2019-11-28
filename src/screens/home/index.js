import React, {useEffect} from 'react';
/*import type {UserState} from '../../ducks/userDuck';
import {useSelector} from 'react-redux';
import type {PreferencesState} from '../../ducks/preferencesDuck';*/
import {makeStyles, Fab} from '@material-ui/core';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HOME, INITIAL_PREFERENCES, NEW_COFFEE} from '../../workflow';
import ScreenLayout from '../../components/screen-layout';
import Navigation from '../../components/navigation';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import {useTheme} from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles(() => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0
    },
    fab: {
        position: 'fixed',
        right: 20,
        bottom: 80
    }
}));
const Home = () => {
    // const user: UserState = useSelector(state => state.user);
    // const preferences: PreferencesState = useSelector(state => state.preferences);
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const route = useRouteMatch(INITIAL_PREFERENCES);
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    useEffect(() => {
        if (route && route.path === INITIAL_PREFERENCES) {
            history.replace(HOME);
        }
    }, [history, route]);

    return (
        <ScreenLayout>
            <Navigation>
                <Zoom
                    mountOnEnter={true}
                    timeout={transitionDuration}
                    in={true}
                    style={{
                        transitionDelay: `${transitionDuration.exit}ms`,
                    }}
                    unmountOnExit={true}
                >
                <Fab
                    color={'primary'}
                    className={classes.fab}
                    onClick={() => {
                        history.push(NEW_COFFEE)
                    }}
                >
                    <CoffeeIcon/>
                </Fab>
                </Zoom>
            </Navigation>
        </ScreenLayout>

    )
};

export default Home;