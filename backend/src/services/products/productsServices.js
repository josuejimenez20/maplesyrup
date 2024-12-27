import dotenv from "dotenv";
import { v2 } from "cloudinary";
import {
  getProducts,
  newProductsGetModels,
  topSellProductsGetModels,
  inOfferProductsGetModels,
  searchProductsByWordModels,
  productInformationByIdModels,
  newProductModel,
  newProductInformationModel,
  editProductInformationModel,
  editProductAdditionalInformationModel
} from "../../models/products/producstModels.js";

// Cloudinary configuration

dotenv.config();
const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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

const editProductInformationService = async (data) => {

  try {

    data.body.count = parseInt(data.body.count);
    data.body.price = parseFloat(data.body.price);

    if (!data.body.fileImage) {

      const { fileImage } = data.files;
      const { secure_url } = await cloudinary.uploader.upload(fileImage.tempFilePath);

      data.body.pathImage = secure_url;

      const response = await editProductInformationModel(data.body);

      const responseInformation = await editProductAdditionalInformationModel(data.body);

      return responseInformation

    } else {

      data.body.pathImage = data.body.fileImage;

      const response = await editProductInformationModel(data.body);
      const responseInformation = await editProductAdditionalInformationModel(data.body);
      
      return responseInformation
    }


  } catch (error) {
    return error;
  }
}

//CREATE 

const newProductsPostServices = async (data) => {
  const { fileImage } = data.files;
  data.body.count = parseInt(data.body.count);
  data.body.price = parseFloat(data.body.price);

  try {
    const { secure_url } = await cloudinary.uploader.upload(fileImage.tempFilePath);

    data.body.pathImage = secure_url;

    const response = await newProductModel(data.body);
    const responseInformation = await newProductInformationModel(response.insertId, data.body);

    return responseInformation;
  } catch (error) {
    return error;
  }
};
export {
  productsGetServices,
  newProductsGetServices,
  topSellProductsGetServices,
  infOfferProductsGetServices,
  searchProductsByWordServices,
  productInformationByIdServices,
  newProductsPostServices,
  editProductInformationService
};
