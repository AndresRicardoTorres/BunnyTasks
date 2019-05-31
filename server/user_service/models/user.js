module.exports = class User {
  constructor(data = {}) {
    this.id = data.id
  }

  setId(id) {
    this.id = id
  }
  setName(name) {
    var nameRegex = RegExp('^[a-zA-Z ]+$')
    if (!nameRegex.test(name)) throw new Error('Invalid name')
    this.name = name
  }
  getId() {
    return this.id
  }

  toSave() {
    return { name: this.name }
  }
  toJSON() {
    return { name: this.name, id: this.id }
  }
}
