import axios from 'axios';
import {
    fetchNewProduct,
    fetchNewProductFailure,
    fetchNewProductSuccess
} from "../../slices/managmentProducts/products/newProduct";

export const AddNewProduct = (data) => async (dispatch) => {

    try {
        dispatch(fetchNewProduct());
        const response = await axios.post('http://localhost:3001/api/products/AddNewProduct', data);
        dispatch(fetchNewProductSuccess(true));
    } catch (error) {    
        dispatch(fetchNewProductFailure(error));
    }


}