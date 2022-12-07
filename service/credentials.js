import axios from 'axios'

async function post(credentials) {
  try {
    const response = await axios.post('/api/auth/login', credentials)
    return response
  } catch (error) {
    const { response } = error
    return response.data
  }
}

export const getUser = async () => {
  const response = await axios.get('/api/user')
  return response.data
}

export const Credentials = {
  post
}
