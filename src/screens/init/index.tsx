import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@material-ui/core';
import {fetchUserFromDb, UserState} from '../../ducks/userDuck';
import {fetchPreferencesFromDb, PreferencesState} from '../../ducks/preferencesDuck';
import {CoffeeState, fetchCoffeesFromDb} from "../../ducks/coffeesDuck";
import {getRoasters, LocalCoffeeState} from "../../ducks/localCoffeesDuck";
import {RootState} from "../../store";

interface Props {
    children: React.ReactNode
}
const Init = ({children}: Props) => {
    const user: UserState = useSelector((state: RootState) => state.user);
    const preferences: PreferencesState = useSelector((state: RootState) => state.preferences);
    const coffees: CoffeeState = useSelector((state: RootState) => state.coffees);
    const localCoffees: LocalCoffeeState = useSelector((state: RootState) => state.localCoffees);

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
        if(!localCoffees.hasFetchedRoasters && !localCoffees.isFetchingRoasters && user.hasBeenInitialized) {
            dispatch(getRoasters(user.state || 'vt'));
        }
    }, [dispatch, preferences.hasBeenInitialized, preferences.isFetching, user.hasBeenInitialized, user.isFetching, coffees.isFetching, coffees.hasBeenInitialized, localCoffees.hasFetchedRoasters, localCoffees.isFetchingRoasters]);
    return user.hasBeenInitialized && preferences.hasBeenInitialized && coffees.hasBeenInitialized ? <>{children}</> : <CircularProgress/>
};

export default Init;