// @flow
import {createSlice} from '@reduxjs/toolkit';
import {fetchUser, saveUser} from '../data-sources/users';
import {ThunkDispatch} from 'redux-thunk';

export type UserState = {
    firstName: string | null,
    lastName: string | null,
    id: string | number,
    fetchSuccess: boolean | null,
    fetchError: boolean | null,
    isFetching: boolean,
    hasBeenInitialized: boolean
};
export type User = {
    firstName: string,
    lastName: string,
    id: string | number
};
type Action = {
    payload: User,
    type: string,
    error: any
}
const initialState: UserState = {
    firstName: null,
    lastName: null,
    fetchError: null,
    fetchSuccess: null,
    isFetching: false,
    hasBeenInitialized: false,
    id: 1
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userFetchRequest: (state: UserState, action: Action): UserState => ({...state, isFetching: true}),
        userFetchSuccess: (state: UserState, action: Action): UserState => ({
            ...state,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            isFetching: false,
            fetchSuccess: true,
            hasBeenInitialized: true
        }),
        userFetchFail: (state: UserState, action: Action): UserState => ({
            ...state,
            isFetching: false,
            fetchError: true,
            fetchSuccess: false,
            hasBeenInitialized: true
        }),
        userFetchReset: (state: UserState, action: Action): UserState => ({
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

export const fetchUserFromDb = (userId: number | string) => async (dispatch: ThunkDispatch<Action>) => {
    dispatch(userFetchRequest());
    try {
        const user = await fetchUser(userId);
        dispatch(userFetchSuccess(user))
    } catch (e) {
        dispatch(userFetchFail(true))
    }
};

export const saveUserToDb = (user: User) => async (dispatch: ThunkDispatch<Action>) => {
    dispatch(userFetchRequest());
    try {
        await saveUser(user);
        dispatch(userFetchSuccess(user));
    } catch (e) {
        dispatch(userFetchFail(true))
    }
};