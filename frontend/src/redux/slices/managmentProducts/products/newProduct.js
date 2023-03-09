import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: null
};

export const newProductSlice = createSlice({
    name: 'newProduct',
    initialState,
    reducers: {
        fetchNewProduct: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchNewProductFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchNewProductSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.success = action.payload
        },
        resetDataNewProductProcess: (state, action) => {
            state.loading = null
            state.error = null
            state.success = null
        }
    }
});

export const {
    fetchNewProduct,
    fetchNewProductFailure,
    fetchNewProductSuccess,
    resetDataNewProductProcess
} = newProductSlice.actions;


