import React, {useEffect} from 'react';
import type {Coffee, CoffeeState} from '../../ducks/coffeesDuck';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardContent, CircularProgress, makeStyles, Typography, List, ListItem, ListItemText, Divider, ListItemSecondaryAction, ListItemIcon} from '@material-ui/core';
import {coffeesFetchReset, fetchCoffeesFromDb, deleteCoffeeFromDb} from '../../ducks/coffeesDuck';
import {BREW_METHODS} from '../../constants';
import ReactGA from 'react-ga';
import * as R from 'ramda';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1)
    }
}));

const MyCoffees = () => {
    const coffees: CoffeeState = useSelector(state => state.coffees);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchCoffeesFromDb(1));
        return () => dispatch(coffeesFetchReset())
    }, [dispatch]);
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const sortedCoffees = R.sort((a, b) => a.rating > b.rating ? -1 : 1, coffees.coffees || []);

    return coffees.coffees && !coffees.isFetching
        ? <List>
            {sortedCoffees.map((coffee: Coffee, index) => (
                <>
                <ListItem key={index} className={classes.card}>
                    <ListItemIcon>
                        <DeleteIcon onClick={() => dispatch(deleteCoffeeFromDb(coffee.id))}/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: 'textPrimary'}} primary={`${coffee.company} ${coffee.name}`} secondary={`${coffee.rating} stars`}/>
                    <ListItemSecondaryAction>
                        <EditIcon color={'secondary'}/>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant='fullWidth' component='li' />
                </>
                ))}
        </List>
            : <CircularProgress/>
};

export default MyCoffees;