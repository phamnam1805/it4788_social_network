import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import SplashScreen from 'react-native-splash-screen';
import {navigate} from '../Navigation';
import {Routes} from '../Routes';

const initialState = {
    loading: true,
    token: null,
};

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const appActions = app.actions;

const getRoot = state => state.app;

export const appSelectors = {
    getLoading: state => getRoot(state).loading,
    getToken: state => getRoot(state).token,
};

export const appOperations = {
    initialize: () => async (dispatch, getState) => {
        let token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch(appActions.setToken(token));
        } else {
            navigate(Routes.LOGIN_SCREEN);
        }
    },
};

export const appReducer = app.reducer;
