const allRoles = {
  user: ['me'],
  adminUnidade: ['me', 'createTurma', 'createUser'],
  admin: ['me', 'createTurma', 'createUser', 'createUnidade'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
