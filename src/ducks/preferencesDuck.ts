import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchPreferences, savePreferences} from '../data-sources/preferences';
import {ThunkDispatch} from 'redux-thunk';
import {AppThunk} from "../store";


export type PreferencesState = {
    roastLevel: string | null,
    brewMethod: string | null,
    origin: string | null,
    company: string | null,
    fetchSuccess: boolean | null,
    fetchError: boolean | null,
    isFetching: boolean,
    hasBeenInitialized: boolean,
    userId: number | string,
};
export type Preferences = {
    roastLevel: string | null,
    brewMethod: string | null,
    origin: string | null,
    company: string | null,
    userId: string | number
};

const initialState: PreferencesState = {
    roastLevel: null,
    brewMethod: null,
    origin: null,
    company: null,
    fetchSuccess: null,
    fetchError: null,
    isFetching: false,
    hasBeenInitialized: false,
    userId: 1
};

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        preferencesFetchRequest: (state: PreferencesState): PreferencesState => ({
            ...state,
            isFetching: true
        }),
        preferencesFetchSuccess: (state: PreferencesState, action: PayloadAction<Preferences>): PreferencesState => ({
            ...state,
            brewMethod: action.payload.brewMethod,
            company: action.payload.company,
            origin: action.payload.origin,
            roastLevel: action.payload.roastLevel,
            hasBeenInitialized: true,
            fetchSuccess: true,
            isFetching: false
        }),
        preferencesFetchFail: (state: PreferencesState): PreferencesState => ({
            ...state,
            isFetching: false,
            fetchError: true,
            fetchSuccess: false,
            hasBeenInitialized: true
        }),
        preferencesFetchReset: (state: PreferencesState): PreferencesState => ({
            ...state,
            fetchError: null,
            fetchSuccess: null,
            isFetching: false
        })
    }
});

export const {
    preferencesFetchRequest,
    preferencesFetchSuccess,
    preferencesFetchFail,
    preferencesFetchReset
} = preferencesSlice.actions;

export default preferencesSlice.reducer;

export const fetchPreferencesFromDb = (userId: number): AppThunk<PreferencesState> => async dispatch => {
    dispatch(preferencesFetchRequest());
    try {
        const preferences = await fetchPreferences(userId);
        dispatch(preferencesFetchSuccess(preferences))
    } catch (e) {
        dispatch(preferencesFetchFail());
    }
};

export const savePreferencesToDb = (preferences: Preferences): AppThunk<PreferencesState> => async dispatch => {
    dispatch(preferencesFetchRequest());
    try {
        await savePreferences(preferences);
        dispatch(preferencesFetchSuccess(preferences));
    } catch (e) {
        dispatch(preferencesFetchFail());
    }
};