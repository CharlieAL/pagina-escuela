import axios from 'axios'
export const logOut = async () => {
  const response = await axios.post('/api/auth/logout')
  return response
}
