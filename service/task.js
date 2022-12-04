import axios from 'axios'

export async function getTask() {
  const response = await axios.get('api/task')
  if (response.status === 200) {
    return response
  }
}
