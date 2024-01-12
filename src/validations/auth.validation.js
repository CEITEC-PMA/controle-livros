const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const registerInep = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    inep: Joi.number().required(),
    nome: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const loginInep = {
  body: Joi.object().keys({
    inep: Joi.number().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const resetPasswordInep = {
  body: Joi.object().keys({
    inep: Joi.number().required(),
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  registerInep,
  login,
  loginInep,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  resetPasswordInep,
  verifyEmail,
};
