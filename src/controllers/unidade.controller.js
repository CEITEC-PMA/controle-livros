const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, unidadeService } = require('../services');

const createUnidade = catchAsync(async (req, res) => {
  const unidade = await unidadeService.createUnidade(req.body);
  res.status(httpStatus.CREATED).send(unidade);
});

const showAllUnidade = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await unidadeService.queryUnidades(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserConnected = catchAsync(async (req, res) => {
  const { inep } = req.user;
  const user = await userService.getUserByInep(inep);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUnidade,
  showAllUnidade,
  getUser,
  getUserConnected,
  updateUser,
  deleteUser,
};
