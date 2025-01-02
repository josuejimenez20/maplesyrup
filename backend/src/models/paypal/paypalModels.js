import { conexion } from "../../database/config.js";

function getUserIdWithUserIdEncryptedModel(data) {
    const { user_id } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT id_user FROM users us WHERE us.id_user_encrypted = '${user_id}'`,
            function (error, result, field) {
                if (error) return reject(error);
                return resolve(result);
            }
        );
    });
}

function setNewOrderModel(user_id, data) {
    const { order_id, payer_id } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO orders (order_id, user_direction_id_fk, user_id_fk, payer_id) 
        VALUES ('${order_id}','${user_id}','${user_id}','${payer_id}')`,
            function (error, result, field) {
                if (error) return reject(error);
                return resolve(result);
            }
        );
    });
}

function setNewProductToOrderModel(product_id, data) {
    const { order_id, payer_id } = data;

    return new Promise((resolve, reject) => {
        conexion.query(
            `INSERT INTO product_to_order (order_id_fk, product_id_fk, quantity) 
        VALUES ('${order_id}','${product_id}','1')`,
            function (error, result, field) {
                if (error) return reject(error);
                return resolve(result);
            }
        );
    });
}

function getAllOrdersModel() {

    return new Promise((resolve, reject) => {
        conexion.query(
            `SELECT 
    u.names AS user_name,
    o.order_id,
    p.name AS product_name,
    p.price,
    p.path_image,
    po.quantity,
    d.city,
    d.postal_code,
    d.suburb,
    d.street
    FROM 
        product_to_order po
    INNER JOIN 
        orders o ON po.order_id_fk = o.order_id
    INNER JOIN 
        products p ON po.product_id_fk = p.id_product
    INNER JOIN 
        users u ON o.user_id_fk = u.id_user
    INNER JOIN 
        directions d ON d.id_user = u.id_user;

`,
            function (error, result, field) {
                if (error) return reject(error);
                return resolve(result);
            }
        );
    });
}

export {
    getUserIdWithUserIdEncryptedModel,
    setNewOrderModel,
    setNewProductToOrderModel,
    getAllOrdersModel
}