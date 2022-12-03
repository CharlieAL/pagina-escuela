import axios from 'axios'
export const logOut = async () => {
  try {
    await axios.post('api/auth/logout')
  } catch (error) {
    console.log(error)
  }
}
