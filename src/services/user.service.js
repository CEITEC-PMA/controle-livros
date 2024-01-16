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
    throw new ApiError(httpStatus.BAD_REQUEST, 'Usuário já existe');
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
  const user = await User.findOne({ username });
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

const modularUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  await updateBody.unidadeId.map(async (id) => {
    const unidade = await getUnidadeById(id);
    unidade.userId.push(userId);
    await unidade.save();
  });

  Object.assign(user, updateBody);
  await user.save();

  return user;
};

const resetPasswordByUserId = async (userId, newPassword) => {
  const user = await getUserById(userId);
  Object.assign(user, newPassword);
  await user.save();
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
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  register,
  queryUsers,
  resetPasswordByUserId,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  modularUserById,
  updateUserById,
  updateAcessoTrue,
  deleteUserById,
};
