import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userData: {}
};

export const getUserInformationSlice = createSlice({
    name: 'getInformationUserSlice',
    initialState,
    reducers: {
        fetchUserInformation: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        fetchUserInformationSuccess: (state, action) => {
            state.loading = false,
                state.error = false,
                state.success = true;
            state.userData = action.payload;
        },
        fetchUserInformationFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        }
    }
});

export const {
    fetchUserInformation,
    fetchUserInformationSuccess,
    fetchUserInformationFailure
} = getUserInformationSlice.actions;


