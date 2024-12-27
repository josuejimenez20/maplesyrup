import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    productInformation: null
};

export const GetProductInformationByIdSlice = createSlice({
    name: 'GetProductInformationByIdSlice',
    initialState,
    reducers: {
        fetchGetProductInformationById: (state, action) => {
            state.loading = true,
                state.error = false
        },
        fetchGetProductInformationByIdFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        fetchGetProductInformationByIdSuccess: (state, action) => {
            state.loading = false,
                state.error = null,
                state.productInformation = action.payload;
        }
    }
});

export const {
    fetchGetProductInformationById,
    fetchGetProductInformationByIdFailure,
    fetchGetProductInformationByIdSuccess,
} = GetProductInformationByIdSlice.actions;


