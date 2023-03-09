import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userData: {}
};

export const newUserSlice = createSlice({
    name: 'newUserSlice',
    initialState,
    reducers: {
        fetchNewUser: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        fetchNewUserSuccess: (state, action) => {
            state.loading = false,
                state.error = false,
                state.success = true;
            state.userData = action.payload;
        },
        fetchNewFaulire: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        }
    }
});

export const {
    fetchNewUser,
    fetchNewUserSuccess,
    fetchNewFaulire
} = newUserSlice.actions;


