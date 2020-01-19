import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchUser, saveUser} from '../data-sources/users';
import {ThunkDispatch} from 'redux-thunk';
import {AppThunk} from "../store";

export type UserState = {
    firstName: string | null,
    lastName: string | null,
    city: string | null,
    state: string | null,
    id: string | number,
    fetchSuccess: boolean | null,
    fetchError: boolean | null,
    isFetching: boolean,
    hasBeenInitialized: boolean
};
export type User = {
    firstName: string | null,
    lastName: string | null,
    city: string | null,
    state: string | null,
    id: string | number
};

const initialState: UserState = {
    firstName: null,
    lastName: null,
    fetchError: null,
    city: null,
    state: null,
    fetchSuccess: null,
    isFetching: false,
    hasBeenInitialized: false,
    id: 1
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetchRequest: (state) => ({...state, isFetching: true}),
        userFetchSuccess: (state, action: PayloadAction<User>) => ({
            ...state,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            state: action.payload.state,
            city: action.payload.city,
            isFetching: false,
            fetchSuccess: true,
            hasBeenInitialized: true
        }),
        userFetchFail: (state) => ({
            ...state,
            isFetching: false,
            fetchError: true,
            fetchSuccess: false,
            hasBeenInitialized: true
        }),
        userFetchReset: (state) => ({
            ...state,
            fetchError: null,
            fetchSuccess: null,
            isFetching: false,
        })
    }
});

export const {
    userFetchFail,
    userFetchReset,
    userFetchRequest,
    userFetchSuccess
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUserFromDb = (userId: number | string): AppThunk<UserState> => async dispatch => {
    dispatch(userFetchRequest());
    try {
        const user = await fetchUser(userId);
        dispatch(userFetchSuccess(user));
    } catch (e) {
        dispatch(userFetchFail());
    }
};

export const saveUserToDb = (user: User): AppThunk<UserState> => async dispatch=> {
    dispatch(userFetchRequest());
    try {
        await saveUser(user);
        dispatch(userFetchSuccess(user));
    } catch (e) {
        dispatch(userFetchFail());
    }
};