// @flow
import {createSlice} from '@reduxjs/toolkit';
import {fetchRoasters} from '../data-sources/coffees-api';
import {ThunkDispatch} from 'redux-thunk';

export type LocalCoffeeState = {
    roasters: Array<string>,
    roasterFetchSuccess: boolean | null,
    roastersFetchError: boolean | null,
    isFetchingRoasters: boolean,
    hasFetchedRoasters: boolean
};

type Action = {
    payload: any,
    type: string,
    error: any
}
const initialState: LocalCoffeeState = {
    roasters: [],
    roasterFetchSuccess: null,
    roastersFetchError: null,
    isFetchingRoasters: false,
    hasFetchedRoasters: false
};

const localCoffeesSlice = createSlice({
    name: 'localCoffees',
    initialState,
    reducers: {
        roastersFetchRequest: (state: LocalCoffeeState, action: Action): LocalCoffeeState => ({...state, isFetchingRoasters: true}),
        roastersFetchSuccess: (state: LocalCoffeeState, action: Action): LocalCoffeeState => ({
            ...state,
            isFetchingRoasters: false,
            hasFetchedRoasters: true,
            roasterFetchSuccess: true,
            roasters: action.payload,
            roastersFetchError: false
        }),
        roastersFetchError: (state: LocalCoffeeState, action: Action): LocalCoffeeState => ({
            ...state,
            isFetchingRoasters: false,
            hasFetchedRoasters: true,
            roasterFetchSuccess: false,
            roasters: [],
            roastersFetchError: action.error
        })
    }
});

export const {
    roastersFetchRequest,
    roastersFetchSuccess,
    roastersFetchError,
} = localCoffeesSlice.actions;

export default localCoffeesSlice.reducer;

export const getRoasters = (state: string = 'vt') => async (dispatch: ThunkDispatch<Action>) => {
    dispatch(roastersFetchRequest());
    try {
        const roasters = await fetchRoasters(state);
        dispatch(roastersFetchSuccess(roasters));
    } catch (e) {
        dispatch(roastersFetchError({error: e.message}))
    }
};