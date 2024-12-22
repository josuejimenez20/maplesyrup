import {
    loginVerifyModel } from "../../models/login/loginModels.js";


const loginVerifyServices = async (email, password) => {
    // Here we would can decrypt email and password 

    try {
        let response = await loginVerifyModel(email, password);
        return response;
    } catch (error) {
        return error;
    }
};

export {
    loginVerifyServices
}