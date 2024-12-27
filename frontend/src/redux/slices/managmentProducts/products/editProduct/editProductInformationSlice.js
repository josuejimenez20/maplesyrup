import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: null
};

export const editProductInformationSlice = createSlice({
    name: 'editProductInformationSlice',
    initialState,
    reducers: {
        fetchEditProductInformation: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchEditProductInformationFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchEditProductInformationSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.success = action.payload;
        },
        initialStateProductInformation: (state, action) => {
            state.loading = null,
            state.error = null,
            state.success = null;
        }
    }
});

export const {
    fetchEditProductInformation,
    fetchEditProductInformationFailure,
    fetchEditProductInformationSuccess,
    initialStateProductInformation
} = editProductInformationSlice.actions;


