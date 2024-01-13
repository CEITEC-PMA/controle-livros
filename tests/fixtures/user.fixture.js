const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('../../src/models/user.model');

const password = 'inep123456';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  inep: faker.number.int(),
  acesso: 1,
  password,
  role: 'user',
  deletado: false,
  isEmailVerified: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  inep: faker.number.int(),
  acesso: 1,
  password,
  role: 'user',
  deletado: false,
  isEmailVerified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  nome: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  inep: faker.number.int(),
  acesso: 1,
  password,
  role: 'admin',
  deletado: false,
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
