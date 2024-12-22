import { conexion } from "../../database/config.js";

function loginVerifyModel(email, password) {
    return new Promise((resolve, reject) => {
        conexion.query(`
                        SELECT * FROM users u 
                        WHERE u.email = "${email}"
                        AND u.password = "${password}"`, function (error, result, field) {
            if (error)
                return reject(error);
            return resolve(result);
        })
    })
}

export {
    loginVerifyModel
}