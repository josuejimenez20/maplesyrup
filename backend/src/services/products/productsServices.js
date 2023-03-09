const { response, request } = require("express");
const {
  getProducts,
  newProductsGetModels,
  topSellProductsGetModels,
  inOfferProductsGetModels,
  searchProductsByWordModels,
  productInformationByIdModels,
  newProductModel,
  newProductInformationModel
} = require("../../models/products/producstModels");

// Cloudinary configuration
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const productsGetServices = async () => {
  try {
    let response = await getProducts();
    return response;
  } catch (error) {
    return error;
  }
};

const newProductsGetServices = async () => {
  try {
    let response = await newProductsGetModels();
    return response;
  } catch (error) {
    return error;
  }
};

const topSellProductsGetServices = async () => {
  try {
    let response = await topSellProductsGetModels();
    return response;
  } catch (error) {
    return error;
  }
};

const infOfferProductsGetServices = async () => {
  try {
    let response = await inOfferProductsGetModels();
    return response;
  } catch (error) {
    return error;
  }
};

const searchProductsByWordServices = async (wordProduct) => {
  try {
    let response = await searchProductsByWordModels(wordProduct);
    return response;
  } catch (error) {
    return error;
  }
};


const productInformationByIdServices = async (id_product) => {

  try {
    let response = await productInformationByIdModels(id_product);
    return response;
  } catch (error) {
    return error
  }
}

//CREATE 

const newProductsPostServices = async (data) => {
  const { fileImage } = data.files;
  data.body.count = parseInt(data.body.count);
  data.body.price = parseFloat(data.body.price);

  // Subimos el archivo a cloudinary
  try {
    // const { secure_url } = await cloudinary.uploader.upload(
    //   fileImage.tempFilePath,
    //   {height: 1250, width: 1870, crop: "scale"}
    // );
    const { secure_url } = await cloudinary.uploader.upload(
      fileImage.tempFilePath
    );
    data.body.pathImage = secure_url;
    // Go to newProductModel
    const response = await newProductModel(data.body);
    // Got to newProductoInformation by id that return us "newProducModel"
    const responseInformation = await newProductInformationModel(response.insertId, data.body);

    return responseInformation;
  } catch (error) {
    return error;
  }
};


module.exports = {
  productsGetServices,
  newProductsGetServices,
  topSellProductsGetServices,
  infOfferProductsGetServices,
  searchProductsByWordServices,
  productInformationByIdServices,
  newProductsPostServices,
};
