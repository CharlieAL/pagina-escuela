import axios from 'axios'

export async function getTask() {
  const response = await axios.get('/api/task')
  if (response.status === 200) {
    return response
  }
}

export async function putTask(params) {
  const res = await axios.put('/api/task', params)
  return res
}

export async function postTask(params) {
  const response = await axios.post('/api/task', params)
  return response
}

export async function putComentarios(params) {
  const response = await axios.put('/api/comentarios/upload', params)
  return response
}

export async function putTaskStatus(params) {
  const response = await axios.put('/api/task/status', params)
  return response
}
