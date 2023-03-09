const { conexion } = require('../../database/config');


function getInformationUserModels(data) {
    const { id_user, email, password } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT * FROM users u 
            INNER JOIN directions ud 
            ON u.id_user_encrypted = ud.id_user_encrypted
            WHERE u.email = '${email}' AND u.password = '${password}'`,
            function (error, result, field) {
                if (error)
                    return reject(error);
                return resolve(result);
            })
    })
}


function newUserModels(id_encrypted, data) {

    const { name, last_name, second_last_name, email, password, telephone,
        gender, birth_date } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO users (id_user_encrypted, names, last_name, second_last_name, email, password, telephone, gender, birth_date) 
        VALUES ('${id_encrypted}', '${name}','${last_name}','${second_last_name}','${email}','${password}','${telephone}','${gender}','${birth_date}')`, function (error, result, field) {
            if (error)
                return reject(error);
            return resolve(result);
        })
    })
}

function newDirectionFromUserId(id_user, data, id_encrypted) {

    const country = "Mexico";
    const { state, city, postal_code, suburb, street, first_heighboring_street,
        second_heighboring_street } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO directions(id_user_encrypted, id_user, country, state, city, postal_code, suburb, 
                street, first_heighboring_street, second_heighboring_street)
        VALUES (
        '${id_encrypted}','${id_user}','${country}','${state}','${city}','${postal_code}','${suburb}',
        '${street}','${first_heighboring_street}', '${second_heighboring_street}')`, function (error, result, field) {
            if (error)
                return reject(error);
            return resolve(result);
        })
    })
}

function editInformationUserModels(data) {

    const {
        id_user, name, last_name, second_last_name,
        email, password, telephone, gender, birth_date,
    } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `UPDATE users u 
              SET names = '${name}', last_name = '${last_name}', second_last_name = '${second_last_name}', 
              email = '${email}', password = '${password}', telephone = '${telephone}', 
              gender = '${gender}', birth_date = '${birth_date}' 
              WHERE u.id_user_encrypted = '${id_user}'`,
            function (error, result, field) {
                if (error)
                    return reject(error);
                return resolve(result);
            })
    })
}

function editInformationDirectionsUserModels(data) {

    const {
        id_user, state, city, postal_code, suburb, street,
        first_heighboring_street, second_heighboring_street
    } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `UPDATE directions
            SET country = 'Mexico', state = '${state}', city = '${city}', postal_code = '${postal_code}',
            suburb = '${suburb}', street = '${state}', first_heighboring_street = '${first_heighboring_street}',
            second_heighboring_street = '${second_heighboring_street}'
            WHERE directions.id_user_encrypted = ${id_user}`,
            function (error, result, field) {
                if (error)
                    return reject(error);
                return resolve(result);
            })
    })
}

module.exports = {
    getInformationUserModels,
    newUserModels,
    newDirectionFromUserId,
    editInformationUserModels,
    editInformationDirectionsUserModels
}



