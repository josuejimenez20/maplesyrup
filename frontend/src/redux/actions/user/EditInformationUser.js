import axios from 'axios';
import {
    fetchEditUser,
    fetchEditFailure,
    fetchEditUserSuccess
} from "../../slices/users/editUserSlice";

// Function for get all products
// The function will have a param for get product for parts

export const EditInformationUser = (editInformationUser) => async (dispatch) => {

    console.log(editInformationUser);

    try {
        dispatch(fetchEditUser());
        const response = await axios.post(`http://localhost:3001/api/users/edit`, editInformationUser);
        console.log(response);
        dispatch(fetchEditUserSuccess(true));
    } catch (error) {
        dispatch(fetchEditFailure("Error al editar la informacion del ususario"));
    }


}