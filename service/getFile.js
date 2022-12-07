import axios from 'axios'

export default async function getFile(fileName) {
  const response = await axios.get(`/api/aws/${fileName}`)
  return response
}
