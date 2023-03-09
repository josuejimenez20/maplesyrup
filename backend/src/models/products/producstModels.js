const { conexion } = require("../../database/config");

function getProducts() {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM products`, function (error, result, field) {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

function newProductsGetModels() {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM products p 
                    ORDER BY p.date_created DESC`, function (error, result, field) {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

function topSellProductsGetModels() {
  return new Promise((resolve, reject) => {
    conexion.query(`
               SELECT p.id_product, p.name, p.price,
                     p.typeProduct, p.path_image,
                     p.count, p.date_created,
                     i.number_sales
               from products p
               INNER JOIN product_information i
               ON p.id_product = i.id_product
               ORDER BY i.number_sales DESC`, function (error, result, field) {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

function inOfferProductsGetModels() {
  return new Promise((resolve, reject) => {
    conexion.query(`
               SELECT p.id_product, p.name, p.price,
		                p.typeProduct, p.path_image,
                    p.count, p.date_created,
                    i.number_sales
               from products p
               INNER JOIN product_information i
               ON p.id_product = i.id_product
               WHERE i.in_offer = 1
               ORDER BY i.number_sales DESC`, function (error, result, field) {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

function searchProductsByWordModels(wordProduct) {
  return new Promise((resolve, reject) => {
    conexion.query(`
                  SELECT * FROM products p
                  WHERE p.name OR p.typeProduct 
                  LIKE '${wordProduct}%'`, function (error, result, field) {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

// TODO: Changed this function
// Get all data minus id_product from "product_information" table
// If there is a problem with get information product, we'll have to 
//  change where get all data for "*"
function productInformationByIdModels(id_product) {
  return new Promise((resolve, reject) => {
    conexion.query(`
                  SELECT p.id_product, p.name, p.count, p.price, p.typeProduct, p.path_image, p.date_created,
                  i.id_product_information, i.in_offer, i.number_sales, i.likes, i.dislike, i.paths_images, i.description
                  FROM products p 
                  INNER JOIN product_information i 
                  ON p.id_product = i.id_product_information
                  WHERE p.id_product = ${id_product}`
      , function (error, result, field) {
        if (error) return reject(error);
        return resolve(result);
      });
  });
}

function newProductModel(data) {
  const { name, count, price, typeProduct, pathImage, dateCreated } = data;

  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO products (name, count, price, typeProduct, path_image, date_created) 
      VALUES ('${name}','${count}','${price}','${typeProduct}','${pathImage}', '${dateCreated}')`,
      function (error, result, field) {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function newProductInformationModel(id_product, data) {
  const { pathImage, description, in_offer } = data;

  return new Promise((resolve, reject) => {
    conexion.query(
      `INSERT INTO product_information(id_product, in_offer, number_sales, likes, dislike, paths_images, description) 
      VALUES ('${id_product}','${in_offer}','0','0','0','${pathImage}','${description}')`,
      function (error, result, field) {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function setCountProductById(data) {
  const { product_id, new_count } = data;

  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE products SET count = '${new_count}' WHERE products.id_product = ${product_id}`,
      function (error, result, field) {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

module.exports = {
  getProducts,
  newProductsGetModels,
  topSellProductsGetModels,
  inOfferProductsGetModels,
  searchProductsByWordModels,
  productInformationByIdModels,
  newProductModel,
  newProductInformationModel,
  setCountProductById
};



// SELECT * FROM products p
// WHERE p.name OR p.typeProduct
// LIKE 'collar%' 