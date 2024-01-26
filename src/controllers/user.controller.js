const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const showAllUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserByIdWithUnidade(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserConnected = catchAsync(async (req, res) => {
  const { username } = req.user;
  const user = await userService.getUserByUsername(username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const modularUser = catchAsync(async (req, res) => {
  const user = await userService.modularUserById(req.params.userId, req.body);
  res.send(user);
});
const removeModulacaoUser = catchAsync(async (req, res) => {
  const user = await userService.removeModularUserById(req.params.userId, req.body);
  res.send(user);
});

const userUpdate = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const updateAcessoZero = catchAsync(async (req, res) => {
  const user = await userService.updateAcessoZeroById(req.params.userId);
  res.send(user);
});

const deleteFalseUpdate = catchAsync(async (req, res) => {
  const user = await userService.deleteFalseUpdateByUserId(req.params.userId);
  res.send(user);
});
const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.userId);
  res.send(user);
});

module.exports = {
  createUser,
  showAllUsers,
  getUserById,
  getUserConnected,
  modularUser,
  userUpdate,
  removeModulacaoUser,
  deleteUser,
  deleteFalseUpdate,
  updateAcessoZero,
};
