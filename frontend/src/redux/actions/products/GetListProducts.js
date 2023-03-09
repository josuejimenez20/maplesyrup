import axios from 'axios';
import {
    fetchProducts,
    fetchProductsFailure,
    fetchProductsSuccess,
} from "../../slices/managmentProducts/products/listProductsSlice";

// Function for get all products
// The function will have a param for get product for parts

export const GetListProducts = () => async (dispatch) => {

    try {
        dispatch(fetchProducts());
        const { data } = await axios.get('http://localhost:3001/api/products');
        dispatch(fetchProductsSuccess(data.data));
    } catch (error) {
        dispatch(fetchProductsFailure(error));
    }


}