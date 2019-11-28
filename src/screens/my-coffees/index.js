import React, {useEffect} from 'react';
import type {Coffee, CoffeeState} from '../../ducks/coffeesDuck';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardContent, CircularProgress, Typography} from '@material-ui/core';
import {coffeesFetchReset, fetchCoffeesFromDb} from '../../ducks/coffeesDuck';
import ScreenLayout from '../../components/screen-layout';
import Navigation from '../../components/navigation';
import {BREW_METHODS} from '../../constants';

const MyCoffees = () => {
    const coffees: CoffeeState = useSelector(state => state.coffees);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCoffeesFromDb(1));
        return () => dispatch(coffeesFetchReset())
    }, [dispatch]);

    return coffees.coffees && !coffees.isFetching
        ? (coffees.coffees || []).map((coffee: Coffee, index) => (
            <Card key={index}>
                <CardContent>
                    <Typography>{BREW_METHODS[coffee.brewMethod]}</Typography>
                    <Typography>{`Rating: ${coffee.rating}`}</Typography>
                    <Typography>{`Profile: ${coffee.flavorProfile}`}</Typography>
                    <Typography>{`Notes: ${coffee.otherObservations}`}</Typography>
                </CardContent>
            </Card>
        )) : <CircularProgress/>
};

export default MyCoffees;