const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { getUnidadeById } = require('./unidade.service');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const register = async (userBody) => {
  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Usuário já existe, favor verificar com o administrador para reativalo');
  }
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email já existe');
  }
  // eslint-disable-next-line no-param-reassign
  userBody.password = 'inep123456';
  return User.create(userBody);
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
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const getUserByIdWithUnidade = async (id) => {
  const user = await User.findById(id).populate('unidadeId', 'nome');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
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
 * @param {number} username
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
  const user = await User.findOne({ username }).populate('unidadeId');
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
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  Object.assign(user, updateBody);
  await user.save();

  return user;
};

const updateAcessoZeroById = async (userId) => {
  const user = await getUserById(userId);
  user.acesso = 0;
  user.password = 'inep123456';
  await user.save();
  return user;
};

const resetPasswordByUserId = async (userId, newPassword) => {
  const user = await getUserById(userId);
  Object.assign(user, newPassword);
  user.acesso = 1;
  await user.save();
  return user;
};

const modularUserById = async (userId, updateBody) => {
  const { unidadeId } = updateBody;
  const user = await getUserById(userId);
  const unidade = await getUnidadeById(unidadeId);
  // indexof retorna -1 se não encontrar a posição do elemento unidadeId na matriz
  if (user.unidadeId.indexOf(unidadeId) === -1) {
    user.unidadeId.push(unidadeId);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unidade já modulada nesse usuário');
  }

  unidade.userId.push(user.id);
  user.ativo = true;
  await user.save();
  await unidade.save();
  return user;
};

const removeModularUserById = async (userId, updateBody) => {
  const { unidadeId } = updateBody;
  const user = await getUserById(userId);
  const unidade = await getUnidadeById(unidadeId);

  user.unidadeId = await user.unidadeId.filter((id) => id.toString() !== unidadeId.toString());

  if (user.unidadeId.length === 0) {
    user.ativo = false;
  }

  unidade.userId = await unidade.userId.filter((id) => id.toString() !== user.id.toString());

  await user.save();
  await unidade.save();
  return user;
};

const updateAcessoTrue = async (username) => {
  const user = await getUserByUsername(username);
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
  if (!user.deletado) {
    user.unidadeId = [];
    user.ativo = false;
    user.acesso = 0;
    user.deletado = true;
  } else {
    user.deletado = false;
  }
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteFalseUpdateByUserId = async (userId) => {
  const user = await getUserById(userId);
  user.deletado = false;
  await user.save();
  return user;
};

module.exports = {
  register,
  queryUsers,
  resetPasswordByUserId,
  getUserById,
  getUserByIdWithUnidade,
  getUserByEmail,
  updateAcessoZeroById,
  getUserByUsername,
  modularUserById,
  updateUserById,
  updateAcessoTrue,
  deleteUserById,
  removeModularUserById,
  deleteFalseUpdateByUserId,
};
