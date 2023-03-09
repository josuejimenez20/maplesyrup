import { combineReducers } from "redux";

import { listShoppingCartSlice } from "./listShpppingCart";


export * from './listShpppingCart'

export const ShoppingCartSliceReducer = combineReducers({
    list: listShoppingCartSlice.reducer
});