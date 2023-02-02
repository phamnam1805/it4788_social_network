import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const authentication = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isLoggedIn = action.payload;
        },
    },
});

export const authenticationActions = authentication.actions;

const getRoot = state => state.authentication;

export const authenticationSelectors = {
    isLoggedIn: state => getRoot(state).isLoggedIn,
};

export const authenticationReducer = authentication.reducer;
