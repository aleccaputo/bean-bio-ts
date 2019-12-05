import React, {useEffect} from 'react';
import type {UserState} from '../../ducks/userDuck';
import {useSelector} from 'react-redux';
import type {PreferencesState} from '../../ducks/preferencesDuck';
import type {Coffee, CoffeeState} from "../../ducks/coffeesDuck";
import {makeStyles, Fab, Card, CardContent, Typography, CardHeader, CardActions} from '@material-ui/core';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HOME, INITIAL_PREFERENCES, NEW_COFFEE} from '../../workflow';
import CoffeeIcon from '@material-ui/icons/LocalCafe';
import {useTheme} from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';
import ReactGA from 'react-ga';
import {humanizeTimeOfDay} from '../../utilities'
import amber from '@material-ui/core/colors/amber';
import lightblue from '@material-ui/core/colors/lightBlue'
import moment from 'moment';
import {BREW_METHODS} from "../../constants";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
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
    },
    welcomeCard: props => ({
        backgroundColor: props.timeOfDay === 'Morning' ? amber[400] : props.timeOfDay === 'Afternoon' ? lightblue[500] : theme.palette.secondary.main,
        margin: theme.spacing(8, 1, 1, 1)
    })
}));
const Home = () => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const coffees: CoffeeState = useSelector(state => state.coffees);

    const timeOfDay = humanizeTimeOfDay();
    const classes = useStyles({timeOfDay});
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

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const numberOfCoffees = coffees.coffees.length;
    const getRandomHighRatedCoffee = (): Coffee => {
        const topCoffees = coffees.coffees.filter((coffee: Coffee) => coffee.rating >= 4);
        return topCoffees[Math.floor(Math.random() * topCoffees.length)] || null;
    };

    const randomCoffee: Coffee = getRandomHighRatedCoffee();

    return (
        <>
            <Card className={classes.welcomeCard} raised={true}>
                <CardHeader
                    avatar={<CoffeeIcon fontSize={'large'}/>}
                    title={`Good ${timeOfDay}, ${user.firstName}`}
                    subheader={moment().format('LL')}
                />
               <CardContent>
                   {randomCoffee ?
                       <Typography variant={'body2'}>
                           {`Based on your preferences, we'd recommend ${randomCoffee.name} from ${randomCoffee.company} brewed with a ${BREW_METHODS[randomCoffee.brewMethod]} or your ${BREW_METHODS[preferences.brewMethod]}`}
                       </Typography> : 'Add some coffees to get started!'
                   }
               </CardContent>
                <CardActions>
                    <Button variant={'outlined'} onClick={() => history.push(NEW_COFFEE)}>{'Add New Coffee'}</Button>
                </CardActions>
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