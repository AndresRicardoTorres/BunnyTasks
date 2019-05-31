const TaskController = require('../tasks')

let userCounter = 42
const TasksDAO = {
  insert: jest.fn().mockImplementation(({ description }) => {
    userCounter++
    return { description, id: userCounter }
  }),
  update: jest.fn().mockImplementation(() => {
    return true
  }),
}

describe('Tasks controller', () => {
  describe('create method', () => {
    test('Should not allow empty description', async () => {
      const controller = TaskController({})
      await expect(controller.create(1, '')).rejects.toThrow(
        'Invalid description'
      )
    })
    test('Should no save with incorrect user id', async () => {
      const description = 'Buy milk'
      const UsersService = {
        get: jest.fn().mockImplementation(() => {
          throw new Error('Not found')
        }),
      }

      const controller = TaskController({ TasksDAO, UsersService })
      await expect(controller.create(1, description)).rejects.toThrow(
        'User not found'
      )
    })
    test('Should save with correct description', async () => {
      const description = 'Buy milk'
      const UsersService = {
        get: jest.fn().mockImplementation(() => {
          return {}
        }),
      }

      const controller = TaskController({ TasksDAO, UsersService })
      await expect(controller.create(1, description)).resolves.toStrictEqual({
        id: 43,
        description,
      })
    })
  })

  describe('update method', () => {
    test('Should not allow empty description', async () => {
      const controller = TaskController({})
      await expect(controller.update(1, '')).rejects.toThrow(
        'Invalid description'
      )
    })
    test('Should save with correct description', async () => {
      const description = 'Buy milk'

      const controller = TaskController({ TasksDAO })

      await expect(controller.update(1, description)).resolves.toBe(true)
    })
  })
})
