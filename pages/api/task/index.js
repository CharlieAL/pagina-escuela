import Task from 'models/Task'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function taskHandler(req, res) {
  const { method, body } = req
  if (method === 'GET') {
    const result = await Task.find()
    return res.status(200).json(result)
  } else if (method === 'POST') {
    try {
      const result = await Task.create(body)
      result.save()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(401)
}
