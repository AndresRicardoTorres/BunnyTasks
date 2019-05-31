const Sequelize = require('sequelize')

module.exports = URL => {
  const sequelize = new Sequelize(URL)
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  User.sync()

  return {
    insert(data) {
      return User.create(data)
    },
    async find() {
      const userModels = await User.findAll()
      return userModels.map(user => {
        return user.get({ plain: true })
      })
    },
    async get(id) {
      return await User.findOne({ where: { id } })
    },
    async update(id, data) {
      const [afectedRows] = await User.update(data, { where: { id } })
      return afectedRows === 1
    },
    async delete(id) {
      const numberDestroyed = await User.destroy({ where: { id } })
      return numberDestroyed === 1
    },
  }
}
