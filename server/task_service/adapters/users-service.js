const Axios = require('axios')

module.exports = baseURL => {
  return {
    get(id) {
      console.log({ baseURL, url: `/${id}` })
      return Axios.request({ baseURL, url: `/${id}`, method: 'get' })
    },
  }
}
