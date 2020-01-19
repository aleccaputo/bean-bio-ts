import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles, Fab, Card, CardContent, Typography, CardHeader, CardActions, Theme} from '@material-ui/core';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {WorkflowTypeEnum} from '../../workflow';
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
import AddIcon from '@material-ui/icons/Add';
import {ReactComponent as CoffeeBeanIcon} from '../../img/coffee-bean.svg'
import {getRoasters} from "../../ducks/localCoffeesDuck";
import {RootState} from "../../store";
import {Coffee} from "../../ducks/coffeesDuck";

const useStyles = makeStyles<Theme, {timeOfDay: string}>((theme: Theme) => ({
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
        margin: theme.spacing(9, 1.5, 1, 1.5)
    }),
    otherCard: {
        margin: theme.spacing(2, 1.5, 1, 1.5)
    },
    beanIcon: {
        fill: theme.palette.primary.main
    }
}));
const Home = () => {
    const user = useSelector((state: RootState) => state.user);
    const localCoffees = useSelector((state: RootState) => state.localCoffees);
    const preferences = useSelector((state: RootState) => state.preferences);
    const coffees = useSelector((state: RootState) => state.coffees);

    const timeOfDay = humanizeTimeOfDay();
    const classes = useStyles({timeOfDay});
    const theme = useTheme<Theme>();
    const history = useHistory();
    const route = useRouteMatch(WorkflowTypeEnum.INITIAL_PREFERENCES);
    const dispatch = useDispatch();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    useEffect(() => {
        if (route && route.path === WorkflowTypeEnum.INITIAL_PREFERENCES) {
            history.replace(WorkflowTypeEnum.HOME);
        }
    }, [history, route]);

    useEffect(() => {
        // if we didn't get the roasters on init, go get them now
        if(!localCoffees.isFetchingRoasters && !localCoffees.hasFetchedRoasters) {
            dispatch(getRoasters(user.state || 'vt'));
        }
    }, [user.state, dispatch, localCoffees.isFetchingRoasters, localCoffees.hasFetchedRoasters]);

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
                           {`Based on your preferences, we'd recommend ${randomCoffee.name} from ${randomCoffee.company} brewed with a ${BREW_METHODS[randomCoffee.brewMethod]} or your ${BREW_METHODS[preferences.brewMethod || '']}`}
                       </Typography> : 'Add some coffees to get started!'
                   }
               </CardContent>
                <CardActions>
                    <Button variant={'outlined'} startIcon={<AddIcon/>} onClick={() => history.push(WorkflowTypeEnum.NEW_COFFEE)}>{'Add New Coffee'}</Button>
                </CardActions>
            </Card>
            { numberOfCoffees
                ? <Card className={classes.otherCard}>
                    <CardHeader
                        avatar={<CoffeeBeanIcon className={classes.beanIcon}/>}
                        title={`You've added ${numberOfCoffees} coffees to Bean Bio!`}
                        subheader={'Keep it up!'}
                    />
                </Card> : null
            }
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
                        history.push(WorkflowTypeEnum.NEW_COFFEE)
                    }}
                >
                    <CoffeeIcon/>
                </Fab>
            </Zoom>
        </>
    )
};

export default Home;