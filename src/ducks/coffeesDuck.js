// @flow
import {createSlice} from '@reduxjs/toolkit';
import {fetchCoffees, saveCoffees} from '../data-sources/coffees';
import {ThunkDispatch} from 'redux-thunk';

export type Coffee = {
    rating: number,
    brewMethod: string,
    flavorProfile?: string | null,
    otherObservations?: string | null,
    name?: string | null,
    company?: string | null,
    userId: number | string
};

export type CoffeeState = {
    coffees: Array<Coffee> | [],
    fetchSuccess: boolean | null,
    fetchError: boolean | null,
    isFetching: boolean,
    hasBeenInitialized: boolean
};

type Action = {
    payload: Array<Coffee>,
    type: string,
    error: any
};

const initialState: CoffeeState = {
    coffees: [],
    fetchSuccess: null,
    fetchError: null,
    isFetching: false,
    hasBeenInitialized: null
};

const coffeesSlice = createSlice({
    name: 'coffees',
    initialState,
    reducers: {
        coffeesFetchRequest: (state: CoffeeState, action: Action): CoffeeState => ({...state, isFetching: true}),
        coffeesFetchSuccess: (state: CoffeeState, action: Action): CoffeeState => ({
            ...state,
            coffees: [...state.coffees, ...action.payload],
            isFetching: false,
            fetchSuccess: true,
            hasBeenInitialized: true
        }),
        coffeesFetchFail: (state: CoffeeState, action: Action): CoffeeState => ({
            ...state,
            coffees: [],
            isFetching: false,
            fetchError: true,
            fetchSuccess: false,
            hasBeenInitialized: true
        }),
        coffeesFetchReset: (state: CoffeeState, action: Action): CoffeeState => ({
            ...state,
            fetchError: null,
            fetchSuccess: null,
            isFetching: false
        })
    }
});

export const {
    coffeesFetchRequest,
    coffeesFetchSuccess,
    coffeesFetchFail,
    coffeesFetchReset
} = coffeesSlice.actions;

export default coffeesSlice.reducer;

export const fetchCoffeesFromDb = (userId: number | string) => async (dispatch: ThunkDispatch<Action>) => {
    dispatch(coffeesFetchRequest());
    try {
        const user = await fetchCoffees(userId);
        dispatch(coffeesFetchSuccess(user))
    } catch (e) {
        dispatch(coffeesFetchFail(true))
    }
};

export const saveCoffeeToDb = (coffee: Coffee) => async (dispatch: ThunkDispatch<Action>) => {
    dispatch(coffeesFetchRequest());
    try {
        await saveCoffees(coffee);
        dispatch(coffeesFetchSuccess([coffee]));
    } catch (e) {
        dispatch(coffeesFetchFail(true))
    }
};