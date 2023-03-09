import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
};

export const listShoppingCartSlice = createSlice({
    name: 'listShoppingCart',
    initialState,
    reducers: {
        fetchShoppingCart: (state, action) => {
            state.loading = action.payload,
                state.error = false
        },
    }
});

export const {
    fetchShoppingCart,
} = listShoppingCartSlice.actions;


