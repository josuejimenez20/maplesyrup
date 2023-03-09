const { Router } = require('express');
const {
    productsGet,
    productsNewGet,
    topSellProductsGet,
    inOfferProductsGet,
    searchProductsByWordGet,
    productInformationById,
    newProductsPost,
} = require('../../controllers/products/productsControllers');

const router = Router();

router.get('/', productsGet);

router.get('/NewProducts', productsNewGet);

router.get('/TopSaleProducts', topSellProductsGet);

router.get('/InOfferProducts', inOfferProductsGet);

router.get('/searchProductsByWord/:word', searchProductsByWordGet);

router.get('/productInformationById/:id', productInformationById);

router.post('/AddNewProduct', newProductsPost);

module.exports = router;