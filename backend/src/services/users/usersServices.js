const {
  getInformationUserModels,
  newUserModels,
  newDirectionFromUserId,
  editInformationUserModels,
  editInformationDirectionsUserModels } = require("../../models/users/usersModels");


const getInformationUserServices = async (data) => {
  try {
    let response = await getInformationUserModels(data);
    return response;
  } catch (error) {
    return error;
  }
}

const newUserPostServices = async (id_encrypted, data) => {

  // Call the models for add user and the response that
  // return the sql we'll set the newDirecionFromServices

  try {
    let response = await newUserModels(id_encrypted, data);
    let second_response = await newDirectionFromServices(response.insertId, data, id_encrypted);

    return second_response;

  } catch (error) {
    return error;
  }
};

const newDirectionFromServices = async (id_user, data_direction, id_encrypted) => {
  try {

    let response = await newDirectionFromUserId(id_user, data_direction, id_encrypted);
    return response;

  } catch (error) {
    return error
  }
}

const editInformationUserServices = async (data) => {

  try {

    let response = await editInformationUserModels(data);
    await editInformationDirectionsUserModels(data);
    return response;

  } catch (error) {
    return error
  }
}




module.exports = {
  getInformationUserServices,
  newUserPostServices,
  editInformationUserServices
};
