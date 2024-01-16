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

const showUnidadeId = catchAsync(async (req, res) => {
  const user = await unidadeService.getUnidadeById(req.params.unidadeId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUnidadeId = catchAsync(async (req, res) => {
  const user = await unidadeService.updateUnidadeById(req.params.unidadeId, req.body);
  res.send(user);
});

const deleteUnidade = catchAsync(async (req, res) => {
  await unidadeService.updateUnidadeById(req.params.unidadeId, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUnidade,
  showAllUnidade,
  showUnidadeId,
  updateUnidadeId,
  deleteUnidade,
};
