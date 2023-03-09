const { Router } = require('express');
const {
    getInformationUserController,
    newUserController,
    editInformationUserController } = require('../../controllers/users/usersControllers');
const { validateCreate } = require('../../validator/users/newUserValidate');
const { editUserValidate } = require('../../validator/users/editUserValidate');

const router = Router();

router.get('/information/:id_user/:email/:password', getInformationUserController);

router.post('/new', validateCreate, newUserController);

router.post('/edit', editUserValidate, editInformationUserController);

module.exports = router;