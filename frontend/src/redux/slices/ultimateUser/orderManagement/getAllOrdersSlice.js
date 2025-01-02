import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    orders : []
};

export const getAllOrdersSlice = createSlice({
    name: 'GetAllOrders',
    initialState,
    reducers: {
        fetchGetAllOrders: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchGetAllOrdersFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchGetAllOrdersSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.orders = action.payload

        }
    }
});

export const {
    fetchGetAllOrders,
    fetchGetAllOrdersFailure,
    fetchGetAllOrdersSuccess
} = getAllOrdersSlice.actions;


