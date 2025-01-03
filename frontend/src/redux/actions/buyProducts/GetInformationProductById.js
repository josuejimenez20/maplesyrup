import axios from 'axios';
import {
    fetchInformationProduct,
    fetchInformationProductFaulire,
    fetchInformationProductSuccess,
} from "../../slices/managmentProducts/products/listInformationProduct";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;


// Function for get information of one product

export const GetInformationProductById = (id_product) => async (dispatch) => {

    try {
        dispatch(fetchInformationProduct());
        const { data } = await axios.get(`${apiEndpoint}/products/productInformationById/${id_product}`);
        dispatch(fetchInformationProductSuccess(data.data[0]));
    } catch (error) {
        dispatch(fetchInformationProductFaulire("Error al obtener la informacion del producto"));
    }
}