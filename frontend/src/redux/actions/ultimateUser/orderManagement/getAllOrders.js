import axios from 'axios';
import {
    fetchGetAllOrders,
    fetchGetAllOrdersSuccess,
    fetchGetAllOrdersFailure
} from "../../../slices/ultimateUser/orderManagement/getAllOrdersSlice";


export const getAllOrdersAction = () => async (dispatch) => {

    try {
        dispatch(fetchGetAllOrders());
        const { data } = await axios.get(`http://localhost:3001/api/paypal/order`);
        dispatch(fetchGetAllOrdersSuccess(data.response.data));
    } catch (error) {
        dispatch(fetchGetAllOrdersFailure("Error to get all orders"));
    }


}