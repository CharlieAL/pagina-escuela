import axios from 'axios'

export async function getUsers() {
  try {
    const response = await axios.get('/api/auth/users')
    const { data } = response
    return data
  } catch (error) {}
}
