import axios from 'axios'

export async function postUser(data) {
  const res = await axios.post('/api/auth/user', data)
  return res
}

export async function getusers() {
  const res = await axios.get('/api/auth/user')
  return res
}
