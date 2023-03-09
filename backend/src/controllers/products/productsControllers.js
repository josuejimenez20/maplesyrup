const { response, request } = require("express");
const {
  productsGetServices,
  newProductsPostServices,
  newProductsGetServices,
  infOfferProductsGetServices,
  topSellProductsGetServices,
  searchProductsByWordServices,
  productInformationByIdServices
} = require("../../services/products/productsServices");

const productsGet = async (req = request, res = response) => {
  try {
    let response = await productsGetServices();
    return res.status(200).json({
      data: response
    });
  } catch (error) {
    res.status(500).json({
      msg: "It couldn't get products ",
      error,
    });
  }
};

const productsNewGet = async (req, res) => {
  try {
    let response = await newProductsGetServices();
    return res.status(200).json({
      data: response
    })
  } catch (error) {
    res.status(500).json({
      msg: "It couldn't get new products"
    })
  }
}

const topSellProductsGet = async (req, res) => {
  try {
    let response = await topSellProductsGetServices();
    return res.status(200).json({
      data: response
    })
  } catch (error) {
    res.status(500).json({
      msg: "It couldn't get top sell products"
    })
  }
}

const inOfferProductsGet = async (req, res) => {
  try {
    let response = await infOfferProductsGetServices();
    return res.status(200).json({
      data: response
    })
  } catch (error) {
    res.status(500).json({
      msg: "It couldn't get top sell products"
    })
  }
}

const searchProductsByWordGet = async (req, res) => {

  const { word } = req.params;

  try {
    let response = await searchProductsByWordServices(word);
    return res.status(200).json({
      response
    })
  } catch (error) {
    res.status(500).json({
      msg: "It couldn't get top sell products"
    })
  }
}

const productInformationById = async (req, res) => {

  const { id } = req.params;

  try {

    let response = await productInformationByIdServices(id)

    return res.status(200).json({
      response
    })
  } catch (error) {
    return res.status(500).json({
      msg: "It couldn't get information of product"
    })
  }
}

// CREATED

const newProductsPost = async (req = request, res) => {
  const { name, count, price, typeProduct } = req.body;

  if (!name || !count || !price || !typeProduct) {
    return res.status(404).json({
      msg: "Necesary Elements: Name, Count, Price, typeProduct and fileImage",
    });
  }

  try {
    let response = await newProductsPostServices(req);
    return res.status(200).json({
      msg: "Product Uploaded",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};


module.exports = {
  productsGet,
  productsNewGet,
  topSellProductsGet,
  inOfferProductsGet,
  searchProductsByWordGet,
  productInformationById,
  newProductsPost,
};
