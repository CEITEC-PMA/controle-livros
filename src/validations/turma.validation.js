const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTurma = {
  body: Joi.object().keys({
    unidadeId: Joi.string().custom(objectId),
    nameTurma: Joi.string().required(),
    qtdeAlunos: Joi.number().required(),
    qtdeProf: Joi.number().required(),
  }),
};

const turmaGetAll = {
  query: Joi.object().keys({
    name: Joi.string(),
    unidadeId: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const showTurmaId = {
  params: Joi.object().keys({
    turmaId: Joi.string().custom(objectId),
  }),
};

const updateUnidadeId = {
  params: Joi.object().keys({
    unidadeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      inep: Joi.number().integer().optional(),
      fone: Joi.string().optional(),
      email: Joi.string().optional().email(),
      coordinates: Joi.array().items(Joi.number()).length(2).optional(),
      endereco: {
        cep: Joi.string().optional(),
        logradouro: Joi.string().optional(),
        quadra: Joi.string().optional().allow(''),
        lote: Joi.string().optional().allow(''),
        complemento: Joi.string().optional().allow(''),
        bairro: Joi.string().optional().allow(''),
        localidade: Joi.string().optional(),
        uf: Joi.string().optional(),
      },
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTurma,
  turmaGetAll,
  showTurmaId,
  updateUnidadeId,
  deleteUser,
};
