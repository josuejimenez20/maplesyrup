import axios from 'axios';
import {
    fetchEditProductInformation,
    fetchEditProductInformationFailure,
    fetchEditProductInformationSuccess,
} from "../../../../redux/slices/managmentProducts/products/editProduct/editProductInformationSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const editProductInformation = (data) => async (dispatch) => {

    try {
        dispatch(fetchEditProductInformation());
        const response = await axios.post(`${apiEndpoint}/products/edit-product-information`, data);
        dispatch(fetchEditProductInformationSuccess(true));
    } catch (error) {
        dispatch(fetchEditProductInformationFailure(error));
    }
}