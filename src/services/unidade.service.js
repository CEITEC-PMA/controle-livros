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
    userId: userBody.userId,
    inep: userBody.inep,
    nome: userBody.nome,
    email: userBody.email,
    fone: userBody.fone,
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
      coordinates: userBody.location.coordinates,
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
const getUnidadeById = async (unidadeId) => {
  const unidade = await Unidade.findById(unidadeId);
  if (!unidade) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unidade not found');
  }
  return unidade;
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
  unidade.userId = unidade.userId.concat(updateBody.userId);
  Object.assign(unidade, updateBody);

  const unidadeAtualizada = await unidade.save({
    userId: updateBody.userId,
    inep: updateBody.inep,
    nome: updateBody.nome,
    email: updateBody.email,
    fone: updateBody.fone,
    endereco: {
      cep: updateBody.endereco.cep,
      logradouro: updateBody.endereco.logradouro,
      complemento: updateBody.endereco.complemento,
      quadra: updateBody.endereco.quadra,
      lote: updateBody.endereco.lote,
      bairro: updateBody.endereco.bairro,
      localidade: updateBody.endereco.localidade,
      uf: updateBody.endereco.uf,
    },
    location: {
      type: 'Point',
      coordinates: updateBody.coordinates,
    },
  });
  return unidadeAtualizada;
};

const updateAcessoTrue = async (cpf) => {
  const user = await getUserByCpf(cpf);
  user.acesso = 1;
  await user.save();
  return user;
};

module.exports = {
  createUnidade,
  queryUnidades,
  getUnidadeById,
  getUserByEmail,
  getUserByCpf,
  updateUnidadeById,
  updateAcessoTrue,
};
