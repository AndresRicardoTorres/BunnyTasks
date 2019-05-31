const mongoose = require('mongoose')

module.exports = URL => {
  mongoose.connect(URL, { useNewUrlParser: true })
  const Task = mongoose.model('Task', {
    description: String,
    user: String,
    state: String,
  })

  return {
    insert(data) {
      const aTask = new Task(data)
      return aTask.save()
    },
    async find(params = {}) {
      return Task.find(params)
    },
    update(id, data) {
      return Task.findByIdAndUpdate(id, data, { new: true })
    },
  }
}
