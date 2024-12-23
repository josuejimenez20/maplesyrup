import { response, request } from "express";

import {
    loginVerifyServices
} from "../../services/login/loginServices.js";

// Here only we call the services, in services where we 
// use our logical businesse logic.
// In services we call of model for can access data or petition

const loginVerify = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        let response = await loginVerifyServices(email, password);

        if (response.length === 0) {
            return res.status(404).json({
                msg: "User Not Found"
            })
        }

        return res.status(200).json({
            response: response[0]
        })
    } catch (error) {
        return error;
    }
};

export {
    loginVerify
}