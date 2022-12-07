import axios from 'axios'

export default async function getComentarios(params) {
  const response = await axios.get(`/api/comentarios/${params}`)
  return response
}
