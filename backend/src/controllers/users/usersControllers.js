const uuid = require('uuid');
const { petitionSQL } = require("../../models/users/usersModels");

const {
  getInformationUserServices,
  newUserPostServices,
  editInformationUserServices
} = require("../../services/users/usersServices");


const getInformationUserController = async (req, res) => {

  try {

    let response = await getInformationUserServices(req.params);

    if (response.length === 0) {
      return res.status(404).json({
        msg: "User Not Found"
      })
    }

    return res.status(200).json({
      response
    })

  } catch (error) {
    return res.status(500).json({
      msg: 'User informacion could not get'
    })
  }
}

const newUserController = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const uniqueID = uuid.v4();
    let response = await newUserPostServices(uniqueID, req.body);

    return res.status(200).json({
      id_user_encrypted: uniqueID,
      names: name,
      email,
      password
    })

  } catch (error) {
    return res.status(500).json({
      msg: "error creating user"
    })
  }
};

const editInformationUserController = async (req, res) => {

  try {
    let response = await editInformationUserServices(req.body);

    return res.status(200).json({
      msg: "User Information Uploaded"
    })

  } catch (error) {
    return res.status(500).json({
      msg: "Error uploaded information user"
    })
  }
};

module.exports = {
  getInformationUserController,
  newUserController,
  editInformationUserController
};
