import axios from 'axios'

const SERVER = 'http://localhost:5004'
axios.defaults.headers.common['Content-Type'] = 'application/json';


export async function get(url, params) {
  let response = await axios.get(`${SERVER}/${url}`, {
    params
  })

  return response
}

const axiosFormActionDefaults = ({ url, method, params = {} }) => ({
  method,
  url,
  data: params,
})

export async function post(url, params) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'POST',
    params
  }))

  return response
}

export async function del(url) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'DELETE',
  }))

  return response
}

export async function put(url, params) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'PUT',
    params
  }))

  return response
}
