import Router from "express";
import {
    getInformationUserController,
    newUserController,
    editInformationUserController
} from "../../controllers/users/usersControllers.js";

import { validateCreate } from "../../validator/users/newUserValidate.js";
import { editUserValidate } from "../../validator/users/editUserValidate.js";

const router = Router();

router.get('/information/:id_user/:email/:password', getInformationUserController);

router.post('/new', validateCreate, newUserController);

router.post('/edit', editUserValidate, editInformationUserController);

export default router;