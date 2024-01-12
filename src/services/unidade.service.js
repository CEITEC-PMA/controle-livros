const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const Unidade = require('../models/unidade.model');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUnidade = async (userBody) => {
  const existeUnidade = await Unidade.find({ inep: userBody.inep });
  if (existeUnidade.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unidade já existe!');
  }

  const unidade = await Unidade.create({
    name: userBody.name,
    inep: userBody.inep,
    fone: userBody.fone,
    email: userBody.email,
    endereco: {
      cep: userBody.endereco.cep,
      logradouro: userBody.endereco.logradouro,
      complemento: userBody.endereco.complemento,
      quadra: userBody.endereco.quadra,
      lote: userBody.endereco.lote,
      bairro: userBody.endereco.bairro,
      localidade: userBody.endereco.localidade,
      uf: userBody.endereco.uf,
    },
    location: {
      type: 'Point',
      coordinates: userBody.coordinates,
    },
  });

  return unidade;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUnidades = async (filter, options) => {
  const unidades = await Unidade.paginate(filter, options);
  return unidades;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Get user by email
 * @param {number} inep
 * @returns {Promise<User>}
 */
const getUserByCpf = async (cpf) => {
  const user = await User.findOne({ cpf });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario não encontrado!');
  }
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateAcessoTrue = async (cpf) => {
  const user = await getUserByCpf(cpf);
  user.acesso = 1;
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUnidade,
  queryUnidades,
  getUserById,
  getUserByEmail,
  getUserByCpf,
  updateUserById,
  updateAcessoTrue,
  deleteUserById,
};
