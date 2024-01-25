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
  await unidade.turmaId.push(turma.id);
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
 * Update user by id
 * @param {ObjectId} unidadeId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateTurmaById = async (turmaId, updateBody) => {
  const turma = await getTurmaById(turmaId);
  Object.assign(turma, updateBody);
  await turma.save();
  return turma;
};

/**
 * Delete user by id
 * @param {ObjectId} turmaId
 * @returns {Promise<User>}
 */
const deleteTurmaById = async (turmaId) => {
  const turma = await getTurmaById(turmaId);
  await turma.remove();
  return turma;
};

module.exports = {
  createTurma,
  queryTurmas,
  getTurmaById,
  updateTurmaById,
  deleteTurmaById,
};
