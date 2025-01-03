import axios from 'axios';
import {
    fetchEditUser,
    fetchEditFailure,
    fetchEditUserSuccess
} from "../../slices/users/editUserSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

// Function for get all products
// The function will have a param for get product for parts

export const EditInformationUser = (editInformationUser) => async (dispatch) => {


    try {
        dispatch(fetchEditUser());
        const response = await axios.post(`${apiEndpoint}/users/edit`, editInformationUser);
        dispatch(fetchEditUserSuccess(true));
    } catch (error) {
        dispatch(fetchEditFailure("Error al editar la informacion del ususario"));
    }


}