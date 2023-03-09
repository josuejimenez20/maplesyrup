import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    loadingAsync: false,
    error: null,
    products: []
};

export const listProductsSlice = createSlice({
    name: 'listProducts',
    initialState,
    reducers: {
        fetchProducts: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchProductsSuccess: (state, action) => {
            state.loading = false,
                state.loadingAsync = false;
            state.error = null,
                state.products = action.payload;
        },
        fetchProductsAsync: (state, action) => {
            state.loadingAsync = true;
            state.error = null;
        }
    }
});

export const {
    fetchProducts,
    fetchProductsFailure,
    fetchProductsSuccess,
    fetchProductsAsync
} = listProductsSlice.actions;


