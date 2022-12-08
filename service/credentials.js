import axios from 'axios'

export async function post(credentials) {
  const response = await axios.post('/api/auth/login', credentials, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}

export const getUser = async () => {
  const response = await axios.get('/api/user')
  return response.data
}
