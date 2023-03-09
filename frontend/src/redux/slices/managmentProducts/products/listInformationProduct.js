import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    productInformation: {}
};

export const listInformationProductSlice = createSlice({
    name: 'listInformationProductSlice',
    initialState,
    reducers: {
        fetchInformationProduct: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchInformationProductFaulire: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchInformationProductSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.productInformation = action.payload;
        }
    }
});

export const {
    fetchInformationProduct,
    fetchInformationProductFaulire,
    fetchInformationProductSuccess,
} = listInformationProductSlice.actions;


