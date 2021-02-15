import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const httpDelete = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const PersonService = {
  getAll: getAll,
  create: create, 
  update: update,
  delete: httpDelete
}

export default PersonService