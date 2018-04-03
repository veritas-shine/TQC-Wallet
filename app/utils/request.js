import axios from 'axios'
const kHost = 'http://localhost:7770'

export default function (url, method, data) {
  return axios[method](kHost + url, data)
}
