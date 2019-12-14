import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {UserState} from '../../ducks/userDuck';
import type {PreferencesState} from '../../ducks/preferencesDuck';
import {CircularProgress} from '@material-ui/core';
import {fetchUserFromDb} from '../../ducks/userDuck';
import {fetchPreferencesFromDb} from '../../ducks/preferencesDuck';
import type {CoffeeState} from "../../ducks/coffeesDuck";
import {fetchCoffeesFromDb} from "../../ducks/coffeesDuck";
import type {LocalCoffeeState} from "../../ducks/localCoffeesDuck";
import {getRoasters} from "../../ducks/localCoffeesDuck";

const Init = ({children}) => {
    const user: UserState = useSelector(state => state.user);
    const preferences: PreferencesState = useSelector(state => state.preferences);
    const coffees: CoffeeState = useSelector(state => state.coffees);
    const localCoffees: LocalCoffeeState = useSelector(state => state.localCoffees);

    const dispatch = useDispatch();
    useEffect(() => {
        if(!user.hasBeenInitialized && !user.isFetching) {
            dispatch(fetchUserFromDb(1));
        }
        if(!preferences.hasBeenInitialized && !preferences.isFetching) {
            dispatch(fetchPreferencesFromDb(1));
        }
        if(!coffees.hasBeenInitialized && !coffees.isFetching) {
            dispatch(fetchCoffeesFromDb(1));
        }
        if(!localCoffees.hasFetchedRoasters && !localCoffees.isFetchingRoasters) {
            dispatch(getRoasters('vt'));
        }
    }, [dispatch, preferences.hasBeenInitialized, preferences.isFetching, user.hasBeenInitialized, user.isFetching, coffees.isFetching, coffees.hasBeenInitialized, localCoffees.hasFetchedRoasters, localCoffees.isFetchingRoasters]);
    return user.hasBeenInitialized && preferences.hasBeenInitialized && coffees.hasBeenInitialized ? children : <CircularProgress/>
};

export default Init;