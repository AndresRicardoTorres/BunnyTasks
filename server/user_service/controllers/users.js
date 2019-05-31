const UserModel = require('../models/user')

module.exports = (dependencies = {}) => {
  const { UsersDAO } = dependencies
  return {
    async create(name) {
      const aNewUser = new UserModel()
      aNewUser.setName(name)
      return await UsersDAO.insert(aNewUser.toSave())
    },
    async list() {
      return UsersDAO.find()
    },
    async get(id) {
      return UsersDAO.get(id)
    },
    async update(id, name) {
      const aUser = new UserModel({ id: id })
      aUser.setName(name)
      return UsersDAO.update(aUser.getId(), aUser.toSave())
    },
    async delete(id) {
      const aUser = new UserModel({ id: id })
      return UsersDAO.delete(aUser.getId())
    },
  }
}
