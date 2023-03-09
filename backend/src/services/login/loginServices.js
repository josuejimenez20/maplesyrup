const {
    loginVerificateModel } = require("../../models/login/loginModels");


const loginVereficateServices = async (email, password) => {
    // Here we would can decrypt email and password 

    try {
        let response = await loginVerificateModel(email, password);
        return response;
    } catch (error) {
        return error;
    }
};

module.exports = {
    loginVereficateServices
}