const restify = require('restify')
const errs = require('restify-errors')
const corsMiddleware = require('restify-cors-middleware')

const TasksController = require('./controllers/tasks')
const TasksDAO = require('./adapters/tasks-dao')
const UsersService = require('./adapters/users-service')

const {DATABASE_URL, USERS_SERVICE_URL} = process.env

const tasksController = TasksController({
  TasksDAO: TasksDAO(DATABASE_URL),
  UsersService: UsersService(USERS_SERVICE_URL),
})

const server = restify.createServer()
const cors = corsMiddleware({ origins: ['*'] })

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.get('/', async (req, res, next) => {
  try {
    const response = await tasksController.list()
    res.send(response)
    next()
  } catch (error) {
    console.error(error)
    next(new errs.BadRequestError(error))
  }
})

server.get('/:user', async (req, res, next) => {
  const userId = req.params.user
  try {
    const response = await tasksController.list(userId)
    res.send(response)
    next()
  } catch (error) {
    console.error(error)
    next(new errs.BadRequestError(error))
  }
})

server.post('/:user', async (req, res, next) => {
  const userId = req.params.user
  const desc = req.body.description
  try {
    const response = await tasksController.create(userId, desc)
    res.send(response)
    next()
  } catch (error) {
    console.error(error)
    next(new errs.BadRequestError(error))
  }
})

server.put('/:task', async (req, res, next) => {
  const taskId = req.params.task
  const desc = req.body.description
  const state = req.body.state
  try {
    const response = await tasksController.update(taskId, desc, state)
    res.send(response)
    next()
  } catch (error) {
    console.error(error)
    next(new errs.BadRequestError(error))
  }
})

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})
