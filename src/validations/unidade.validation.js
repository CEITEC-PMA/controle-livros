const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUnidade = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    inep: Joi.string().required(),
    fone: Joi.string().required(),
    email: Joi.string().required().email(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    endereco: {
      cep: Joi.string().required(),
      logradouro: Joi.string().required(),
      quadra: Joi.string().optional().allow(''),
      lote: Joi.string().optional().allow(''),
      complemento: Joi.string().optional().allow(''),
      bairro: Joi.string().optional().allow(''),
      localidade: Joi.string().required(),
      uf: Joi.string().required(),
    },
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUnidade,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
