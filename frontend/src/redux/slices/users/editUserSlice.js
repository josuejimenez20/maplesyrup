import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const editUserSlice = createSlice({
    name: 'editUserSlice',
    initialState,
    reducers: {
        fetchEditUser: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        fetchEditUserSuccess: (state, action) => {
            state.loading = false,
                state.error = false,
                state.success = action.payload;
        },
        fetchEditFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        }
    }
});

export const {
    fetchEditUser,
    fetchEditFailure,
    fetchEditUserSuccess
} = editUserSlice.actions;


