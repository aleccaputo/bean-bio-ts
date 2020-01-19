import UserReducer from '../ducks/userDuck';
import PreferencesReducer from '../ducks/preferencesDuck';
import CoffeesReducer from '../ducks/coffeesDuck';
import LocalCoffeesReducer from '../ducks/localCoffeesDuck';
import {configureStore, getDefaultMiddleware, Action, combineReducers} from "@reduxjs/toolkit";
import thunk, {ThunkAction} from "redux-thunk";

function logger({ getState }: any) {
    return (next: any) => (action: any) => {
        console.log('will dispatch', action);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log('state after dispatch', getState());

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

const rootReducer = combineReducers({
    user: UserReducer,
    preferences: PreferencesReducer,
    coffees: CoffeesReducer,
    localCoffees: LocalCoffeesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunk, logger]
});

/**
 * S the type of the state
 */
export type AppThunk<S> = ThunkAction<void, S, null, Action<string>>

export default store;