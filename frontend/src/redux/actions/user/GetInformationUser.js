import axios from 'axios';
import {
    fetchUserInformation,
    fetchUserInformationSuccess,
    fetchUserInformationFailure
} from "../../slices/users/informationUserSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

// Function for get all products
// The function will have a param for get product for parts

export const GetInformationUser = (id_user, email, password) => async (dispatch) => {

    try {
        dispatch(fetchUserInformation());
        const { data } = await axios.get(`${apiEndpoint}/users/information/${id_user}}/${email}/${password}`);
        dispatch(fetchUserInformationSuccess(data.response[0]));
    } catch (error) {
        dispatch(fetchUserInformationFailure(error));
    }


}