import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteCoffee, fetchCoffees, saveCoffees} from '../data-sources/coffees';
import {AppThunk} from "../store";

export interface Coffee {
    id?: number,
    rating: number,
    brewMethod: string,
    flavorProfile?: string | null,
    otherObservations?: string | null,
    name?: string | null,
    company?: string | null,
    userId: number | string
}

export interface CoffeeState {
    coffees: Coffee[],
    fetchSuccess: boolean | null,
    fetchError: boolean | null,
    isFetching: boolean,
    hasBeenInitialized: boolean
}

const initialState: CoffeeState = {
    coffees: [],
    fetchSuccess: null,
    fetchError: null,
    isFetching: false,
    hasBeenInitialized: false
};

const coffeesSlice = createSlice({
    name: 'coffees',
    initialState,
    reducers: {
        coffeesFetchRequest: (state): CoffeeState => ({...state, isFetching: true}),
        coffeesFetchSuccess: (state: CoffeeState, action: PayloadAction<Coffee[]>): CoffeeState => ({
            ...state,
            coffees: action.payload,
            isFetching: false,
            fetchSuccess: true,
            hasBeenInitialized: true
        }),
        coffeesAddSuccess: (state: CoffeeState, action: PayloadAction<Coffee[]>): CoffeeState => ({
            ...state,
            coffees: [...state.coffees, ...action.payload],
            isFetching: false,
            fetchSuccess: true
        }),
        coffeesFetchFail: (state: CoffeeState): CoffeeState => ({
            ...state,
            coffees: [],
            isFetching: false,
            fetchError: true,
            fetchSuccess: false,
            hasBeenInitialized: true
        }),
        coffeesFetchReset: (state: CoffeeState): CoffeeState => ({
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
    coffeesFetchReset,
    coffeesAddSuccess
} = coffeesSlice.actions;

export default coffeesSlice.reducer;

export const fetchCoffeesFromDb = (userId: number): AppThunk<CoffeeState> => async dispatch => {
    dispatch(coffeesFetchRequest());
    try {
        const coffees = await fetchCoffees(userId);
        dispatch(coffeesFetchSuccess(coffees))
    } catch (e) {
        dispatch(coffeesFetchFail())
    }
};

export const saveCoffeeToDb = (coffee: Coffee): AppThunk<CoffeeState> => async dispatch => {
    dispatch(coffeesFetchRequest());
    try {
        await saveCoffees(coffee);
        dispatch(coffeesAddSuccess([coffee]));
    } catch (e) {
        dispatch(coffeesFetchFail())
    }
};

export const deleteCoffeeFromDb = (coffeeId: number): AppThunk<CoffeeState> => async dispatch => {
    dispatch(coffeesFetchRequest());
    try {
        await deleteCoffee(coffeeId);
        dispatch(fetchCoffeesFromDb(1));
    } catch (e) {
        dispatch(coffeesFetchFail());
    }
};