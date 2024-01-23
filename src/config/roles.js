const allRoles = {
  user: ['me'],
  adminUnidade: ['me', 'createUser'],
  admin: ['me', 'create', 'createUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
