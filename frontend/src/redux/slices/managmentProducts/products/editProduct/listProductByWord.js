import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    products: []
};

export const listProductByWordSlice = createSlice({
    name: 'listProductByWordSlice',
    initialState,
    reducers: {
        fetchProductsByWord: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchProductsByWordFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchProductsByWordSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.products = action.payload;
        },
        initialStateProductsByWord: (state, action) => {
            state.loading = false,
                state.error = null,
                state.products = [];
        }
    }
});

export const {
    fetchProductsByWord,
    fetchProductsByWordFailure,
    fetchProductsByWordSuccess,
    initialStateProductsByWord
} = listProductByWordSlice.actions;


