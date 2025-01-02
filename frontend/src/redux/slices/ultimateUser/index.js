import { combineReducers } from "redux";

import { getAllOrdersSlice } from "./orderManagement/getAllOrdersSlice";

export * from './orderManagement/getAllOrdersSlice'

export const UltimateUserReducer = combineReducers({
    list: getAllOrdersSlice.reducer,
    
});