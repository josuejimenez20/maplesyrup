import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: null
};

export const paymentProductsSlice = createSlice({
    name: 'paymentProducts',
    initialState,
    reducers: {
        fetchPaymentProducts: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchPaymentProductsFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchPaymentProductsSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.success = action.payload

        }
    }
});

export const {
    fetchPaymentProducts,
    fetchPaymentProductsFailure,
    fetchPaymentProductsSuccess
} = paymentProductsSlice.actions;


