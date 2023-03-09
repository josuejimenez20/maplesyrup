import axios from 'axios';
import {
    fetchInformationProduct,
    fetchInformationProductFaulire,
    fetchInformationProductSuccess,
} from "../../slices/managmentProducts/products/listInformationProduct";

// Function for get information of one product

export const GetInformationProductById = (id_product) => async (dispatch) => {

    try {
        dispatch(fetchInformationProduct());
        const { data } = await axios.get(`http://localhost:3001/api/products/productInformationById/${id_product}`);
        dispatch(fetchInformationProductSuccess(data.response[0]));
    } catch (error) {
        dispatch(fetchInformationProductFaulire("Error al obtener la informacion del producto"));
    }
}