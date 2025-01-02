import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ProductsReducer } from '../slices/managmentProducts/products';
import { ShoppingCartSliceReducer } from '../slices/managmentProducts/shoppingCart';
import { UsersReducer } from '../slices/users';
import { UltimateUserReducer } from "../slices/ultimateUser/index";

const combineReducer = combineReducers({
    products: ProductsReducer,
    shopping_cart: ShoppingCartSliceReducer,
    users: UsersReducer,
    ultimateUser: UltimateUserReducer
});

const rootReducer = (state, action) => {
    return combineReducer(state, action);
}

export const store = configureStore({
    reducer: rootReducer,
})