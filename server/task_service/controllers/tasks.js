const TaskModel = require('../models/task')

module.exports = (dependencies = {}) => {
  const { TasksDAO, UsersService } = dependencies
  return {
    async create(userId, desc) {
      const aNewTask = new TaskModel()
      aNewTask.setUserId(userId)
      aNewTask.setDescription(desc)
      aNewTask.setState('TODO')
      try {
        await UsersService.get(userId)
      } catch (error) {
        throw new Error('User not found')
      }
      return await TasksDAO.insert(aNewTask.toSave())
    },
    async list(userId) {
      if (userId) return TasksDAO.find({ user: userId })
      else return TasksDAO.find()
    },
    async update(id, desc, state) {
      const aTask = new TaskModel({ id: id })
      if (desc) aTask.setDescription(desc)
      if (state) aTask.setState(state)
      return TasksDAO.update(aTask.getId(), aTask.toSave())
    },
  }
}
