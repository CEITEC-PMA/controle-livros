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

const updateTurma = {
  params: Joi.object().keys({
    unidadeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      nameTurma: Joi.string().required(),
      qtdeAlunos: Joi.number().required(),
      qtdeProf: Joi.number().required(),
    })
    .min(1),
};

const deleteTurma = {
  params: Joi.object().keys({
    turmaId: Joi.required().custom(objectId),
  }),
};
module.exports = {
  createTurma,
  turmaGetAll,
  showTurmaId,
  updateTurma,
  deleteTurma,
};
