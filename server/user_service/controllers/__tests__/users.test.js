const UserController = require('../users')

let userCounter = 42
const UsersDAO = {
  insert: jest.fn().mockImplementation(({ name }) => {
    userCounter++
    return { name, id: userCounter }
  }),
  update: jest.fn().mockImplementation(() => {
    return true
  }),
}

describe('User controller', () => {
  describe('create method', () => {
    test('Should not allow empty name', async () => {
      const controller = UserController({})
      await expect(controller.create('')).rejects.toThrow('Invalid name')
    })
    test('Should not allow numbers', async () => {
      const controller = UserController({})
      const name = 'a9'
      await expect(controller.create(name)).rejects.toThrow('Invalid name')
    })
    test('Should not allow symbols', async () => {
      const controller = UserController({})
      const name = 'a_b'
      await expect(controller.create(name)).rejects.toThrow('Invalid name')
    })
    test('Should allow a simple name', async () => {
      const name = 'Leidy'

      const controller = UserController({ UsersDAO })

      await expect(controller.create(name)).resolves.toStrictEqual({
        id: 43,
        name,
      })
    })
    test('Should allow a simple name2', async () => {
      const name = 'elaine'

      const controller = UserController({ UsersDAO })
      await expect(controller.create(name)).resolves.toStrictEqual({
        id: 44,
        name,
      })
    })
    test('Should allow a compound name', async () => {
      const name = 'Jhon Doe'

      const controller = UserController({ UsersDAO })
      await expect(controller.create(name)).resolves.toStrictEqual({
        id: 45,
        name,
      })
    })
  })

  describe('update method', () => {
    test('Should not allow empty name', async () => {
      const controller = UserController({})
      await expect(controller.update(1, '')).rejects.toThrow('Invalid name')
    })
    test('Should not allow numbers', async () => {
      const controller = UserController({})
      const name = 'a9'
      await expect(controller.update(1, name)).rejects.toThrow('Invalid name')
    })
    test('Should not allow symbols', async () => {
      const controller = UserController({})
      const name = 'a_b'
      await expect(controller.update(1, name)).rejects.toThrow('Invalid name')
    })
    test('Should allow a simple name', async () => {
      const name = 'Leidy'

      const controller = UserController({ UsersDAO })

      await expect(controller.update(1, name)).resolves.toBe(true)
    })
    test('Should allow a simple name2', async () => {
      const name = 'elaine'

      const controller = UserController({ UsersDAO })
      await expect(controller.update(1, name)).resolves.toBe(true)
    })
    test('Should allow a compound name', async () => {
      const name = 'Jhon Doe'

      const controller = UserController({ UsersDAO })
      await expect(controller.update(1, name)).resolves.toBe(true)
    })
  })
})
