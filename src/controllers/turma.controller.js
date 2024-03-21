const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { turmaService } = require('../services');

const createTurma = catchAsync(async (req, res) => {
  const turma = await turmaService.createTurma(req.body);
  res.status(httpStatus.CREATED).send(turma);
});

const turmaGetAll = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role', 'unidadeId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const results = await turmaService.queryTurmas(filter, options);
  res.status(httpStatus.OK).send(results);
});

const showTurmaId = catchAsync(async (req, res) => {
  const user = await turmaService.getTurmaById(req.params.turmaId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateTurma = catchAsync(async (req, res) => {
  const turma = await turmaService.updateTurmaById(req.params.turmaId, req.body);
  res.send(turma);
});

const deleteTurma = catchAsync(async (req, res) => {
  await turmaService.deleteTurmaById(req.params.turmaId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTurma,
  turmaGetAll,
  showTurmaId,
  updateTurma,
  deleteTurma,
};
