const Hapi = require('@hapi/hapi')
const Boom = require('boom')

const UserController = require('./controllers/users')
const UsersDAO = require('./adapters/users-dao')

// ToDo: ENV
const DBURL = 'postgres://postgres:docker@localhost:5433/postgres'

const userController = UserController({ UsersDAO: UsersDAO(DBURL) })

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: { cors: true },
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: async () => {
      try {
        return await userController.list()
      } catch (error) {
        throw Boom.badRequest(error)
      }
    },
  })

  server.route({
    method: 'GET',
    path: '/{id}',
    handler: async request => {
      const id = request.params.id
      try {
        const response = await userController.get(id)
        if (response === null) return Boom.notFound('User not found')
        else return response
      } catch (error) {
        throw Boom.badRequest(error)
      }
    },
  })

  server.route({
    method: 'POST',
    path: '/',
    handler: async request => {
      const name = request.payload.name
      try {
        return await userController.create(name)
      } catch (error) {
        throw Boom.badRequest(error)
      }
    },
  })

  server.route({
    method: 'PUT',
    path: '/{id}',
    handler: async request => {
      const name = request.payload.name
      const id = request.params.id
      try {
        return await userController.update(id, name)
      } catch (error) {
        throw Boom.badRequest(error)
      }
    },
  })

  server.route({
    method: 'DELETE',
    path: '/{id}',
    handler: async request => {
      const id = request.params.id
      try {
        return await userController.delete(id)
      } catch (error) {
        throw Boom.badRequest(error)
      }
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
