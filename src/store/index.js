import UserReducer from '../ducks/userDuck';
import PreferencesReducer from '../ducks/preferencesDuck';
import CoffeesReducer from '../ducks/coffeesDuck';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

const store = configureStore({
    reducer: {
        user: UserReducer,
        preferences: PreferencesReducer,
        coffees: CoffeesReducer
    },
    middleware: [...getDefaultMiddleware(), thunk, logger]
});

export default store;