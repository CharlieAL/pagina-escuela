import axios from 'axios'

async function post(credentials) {
  const response = await axios.post('/api/auth/login', credentials)
  return response
}

export const getUser = async () => {
  const response = await axios.get('/api/user')
  return response.data
}

export const Credentials = {
  post
}
