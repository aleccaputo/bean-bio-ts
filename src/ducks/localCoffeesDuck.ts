import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchRoasters} from '../data-sources/coffees-api';
import { AppThunk } from '../store';

type Roasters = string[];
export interface LocalCoffeeState {
    roasters: Roasters,
    roasterFetchSuccess: boolean | null,
    roastersFetchError: boolean | string | null,
    isFetchingRoasters: boolean,
    hasFetchedRoasters: boolean
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
        roastersFetchRequest: (state) => ({...state, isFetchingRoasters: true}),
        roastersFetchSuccess: (state, action: PayloadAction<Roasters>) => ({
            ...state,
            isFetchingRoasters: false,
            hasFetchedRoasters: true,
            roasterFetchSuccess: true,
            roasters: action.payload,
            roastersFetchError: false
        }),
        roastersFetchError: (state, action: PayloadAction<string>) => ({
            ...state,
            isFetchingRoasters: false,
            hasFetchedRoasters: true,
            roasterFetchSuccess: false,
            roasters: [],
            roastersFetchError: action.payload
        })
    }
});

export const {
    roastersFetchRequest,
    roastersFetchSuccess,
    roastersFetchError,
} = localCoffeesSlice.actions;

export default localCoffeesSlice.reducer;

export const getRoasters = (state: string = 'vt'): AppThunk<LocalCoffeeState> => async dispatch => {
    dispatch(roastersFetchRequest());
    try {
        const roasters = await fetchRoasters(state);
        dispatch(roastersFetchSuccess(roasters));
    } catch (e) {
        dispatch(roastersFetchError(e.message));
    }
};