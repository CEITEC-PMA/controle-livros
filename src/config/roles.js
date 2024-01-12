const allRoles = {
  user: ['me'],
  analista: ['me'],
  admin: ['me', 'criarUnidade'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
