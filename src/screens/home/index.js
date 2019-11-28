import React, {useEffect} from 'react';
/*import type {UserState} from '../../ducks/userDuck';
import {useSelector} from 'react-redux';
import type {PreferencesState} from '../../ducks/preferencesDuck';*/
import {makeStyles, Fab, Card, CardContent, Typography} from '@material-ui/core';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HOME, INITIAL_PREFERENCES, NEW_COFFEE} from '../../workflow';
import ScreenLayout from '../../components/screen-layout';
import Navigation from '../../components/navigation';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import {useTheme} from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';
import CardMedia from "@material-ui/core/CardMedia";
import NewMoon from '../../img/newmoon.png';
import ContentLayout from "../../components/content-layout";


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
    },
    link: {
        color: 'inherit'
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
        <>
        <Card>
            <ContentLayout direction={'row'} xs={6} alignContent={'center'} alignItems={'center'}>
                <CardContent>
                    <Typography variant={'h5'} align={'left'}>
                        {'New Moon Cafe'}
                    </Typography>
                    <a className={classes.link} target={'_blank'} href={'https://www.google.com/maps/place/New+Moon+Cafe/@44.479409,-73.2143057,17z/data=!3m1!4b1!4m5!3m4!1s0x4cca7af6f2f95165:0x7c8f94d001b3dcf4!8m2!3d44.479409!4d-73.212117'}>
                        <Typography variant={'subtitle1'} align={'left'}>
                            {'150 Cherry Street'}
                        </Typography>
                        <Typography variant={'subtitle1'} align={'left'}>
                            {'Burlington, VT 05401'}
                        </Typography>
                    </a>
                </CardContent>
                <CardMedia>
                    <img align={'right'} width={90} src={NewMoon}/>
                </CardMedia>
            </ContentLayout>
        </Card>
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
        </>
    )
};

export default Home;