const httpStatus = require('http-status');
const { Turma } = require('../models');
const ApiError = require('../utils/ApiError');
const Unidade = require('../models/unidade.model');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createTurma = async (userBody) => {
  const turma = await Turma.create({
    unidadeId: userBody.unidadeId,
    nameTurma: userBody.nameTurma,
    qtdeAlunos: userBody.qtdeAlunos,
    qtdeProf: userBody.qtdeProf,
  });

  const unidade = await Unidade.findById(userBody.unidadeId);
  unidade.turmaId = turma.id;
  await unidade.save();

  return turma;
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
const queryTurmas = async (filter, options) => {
  const turmas = await Turma.paginate(filter, options);
  return turmas;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getTurmaById = async (turmaId) => {
  const turma = await Turma.findById(turmaId);
  if (!turma) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Turma not found');
  }
  return turma;
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
 * @param {ObjectId} unidadeId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUnidadeById = async (unidadeId, updateBody) => {
  const unidade = await getUnidadeById(unidadeId);
  Object.assign(unidade, updateBody);
  await unidade.save();
  return unidade;
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
  createTurma,
  queryTurmas,
  getTurmaById,
  getUserByEmail,
  getUserByCpf,
  updateUnidadeById,
  updateAcessoTrue,
  deleteUserById,
};
