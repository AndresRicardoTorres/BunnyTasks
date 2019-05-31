const VALID_STATES = ['TODO', 'DONE']

module.exports = class Task {
  constructor(data = {}) {
    this.id = data.id
  }

  setId(id) {
    this.id = id
  }
  setUserId(id) {
    this.user_id = id
  }
  setState(s) {
    if (!VALID_STATES.includes(s)) throw new Error(`Invalid state: ${s}`)
    this.state = s
  }
  setDescription(desc) {
    if (!desc) throw new Error('Invalid description')
    this.description = desc
  }

  getId() {
    return this.id
  }

  toSave() {
    const o = {}
    if (this.description) o.description = this.description
    if (this.state) o.state = this.state
    if (this.user_id) o.user = this.user_id
    return o
  }
  toJSON() {
    return { description: this.name, id: this.id ,state:this.state}
  }
}
