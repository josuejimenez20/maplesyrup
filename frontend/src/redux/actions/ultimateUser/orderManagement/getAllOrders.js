import axios from 'axios';
import {
    fetchGetAllOrders,
    fetchGetAllOrdersSuccess,
    fetchGetAllOrdersFailure
} from "../../../slices/ultimateUser/orderManagement/getAllOrdersSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;


export const getAllOrdersAction = () => async (dispatch) => {

    try {
        dispatch(fetchGetAllOrders());
        const { data } = await axios.get(`${apiEndpoint}/paypal/order`);
        dispatch(fetchGetAllOrdersSuccess(data.response.data));
    } catch (error) {
        dispatch(fetchGetAllOrdersFailure("Error to get all orders"));
    }


}