import axios from 'axios';
import {
    fetchUserInformation,
    fetchUserInformationSuccess,
    fetchUserInformationFailure
} from "../../slices/users/informationUserSlice";

// Function for get all products
// The function will have a param for get product for parts

export const GetInformationUser = (id_user, email, password) => async (dispatch) => {

    try {
        dispatch(fetchUserInformation());
        const { data } = await axios.get(`http://localhost:3001/api/users/information/${id_user}}/${email}/${password}`);
        dispatch(fetchUserInformationSuccess(data.response[0]));
    } catch (error) {
        dispatch(fetchUserInformationFailure(error));
    }


}