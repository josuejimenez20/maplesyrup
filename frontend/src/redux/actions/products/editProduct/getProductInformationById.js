import axios from 'axios';
import {
    fetchGetProductInformationById,
    fetchGetProductInformationByIdFailure,
    fetchGetProductInformationByIdSuccess,
} from "../../../../redux/slices/managmentProducts/products/editProduct/getProductInformationByIdSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const GetProductInformationById = (product_id) => async (dispatch) => {

    try {
        dispatch(fetchGetProductInformationById());
        const { data } = await axios.get(`${apiEndpoint}/products/productInformationById/${product_id}`);
        dispatch(fetchGetProductInformationByIdSuccess(data.data[0]));
    } catch (error) {
        dispatch(fetchGetProductInformationByIdFailure(error));
    }
}