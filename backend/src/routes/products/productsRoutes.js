import Router from "express";
import {
    productsGet,
    productsNewGet,
    topSellProductsGet,
    inOfferProductsGet,
    searchProductsByWordGet,
    productInformationById,
    newProductsPost,
    editProductInformationController
} from "../../controllers/products/productsControllers.js";

const router = Router();

router.get('/', productsGet);

router.get('/NewProducts', productsNewGet);

router.get('/TopSaleProducts', topSellProductsGet);

router.get('/InOfferProducts', inOfferProductsGet);

router.get('/searchProductsByWord/:word', searchProductsByWordGet);

router.get('/productInformationById/:id', productInformationById);

router.post('/edit-product-information', editProductInformationController);

router.post('/AddNewProduct', newProductsPost);

export default router;