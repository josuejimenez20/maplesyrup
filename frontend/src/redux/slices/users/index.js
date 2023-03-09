import { combineReducers } from "redux";

import { newUserSlice } from "./newUserSlice";
import { getUserInformationSlice } from "./informationUserSlice";
import { editUserSlice } from "./editUserSlice";


export * from './newUserSlice';
export * from './informationUserSlice';
export * from './editUserSlice';

export const UsersReducer = combineReducers({
    new: newUserSlice.reducer,
    edit: editUserSlice.reducer,
    information: getUserInformationSlice.reducer
});