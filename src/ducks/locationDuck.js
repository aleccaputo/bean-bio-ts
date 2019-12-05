// @flow
import {createSlice} from '@reduxjs/toolkit';

export type Location = {
    name: string | null,
    city: string | null,
    state: string | null,
    zip: string | null,
    mapUrl: string | null,
    imageUrl: string | null,
    distanceFromMe: string | null
}

export type LocationState = {
    locations: Array<Location> | null,
    locationsLoading: boolean,
    locationsFetchSuccess: boolean | null,
    locationsFetchFail: boolean | null,
}

const initialState: LocationState = {
    locations: null,
    locationsLoading: false,
    locationsFetchSuccess: null,
    locationsFetchFail: null
};

type Action = {
    payload: Array<Location>,
    type: string,
    error: any
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        locationsFetchRequest: (state: LocationState, action: Action): LocationState => ({...state, locationsLoading: true}),
        locationsFetchSuccess: (state: LocationState, action: Action): LocationState => ({
            ...state,
            locations: action.payload,
            locationsLoading: false,
            locationsFetchFail: false,
            locationsFetchSuccess: true
        }),
        locationsFetchFail: (state: LocationState, action: Action): LocationState => ({
            ...state,
            locations: null,
            locationsLoading: false,
            locationsFetchFail: true,
            locationsFetchSuccess: false
        }),
        locationsFetchReset: (state: LocationState, action: Action): LocationState => ({
            ...state,
            locationsLoading: false,
            locationsFetchFail: null,
            locationsFetchSuccess: null
        })
    }
});

export const {
    locationsFetchRequest,
    locationsFetchSuccess,
    locationsFetchFail,
    locationsFetchReset
} = locationsSlice.actions;

export default locationsSlice.reducer;



