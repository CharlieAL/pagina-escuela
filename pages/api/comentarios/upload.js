import Task from 'models/Task'
import { dbConnection } from 'utils/db'
dbConnection()

export default async function handle(req, res) {
  const { method, body } = req
  if (method !== 'PUT') {
    return res.status(401).json('No aceptamos ese metodo')
  }
  const { comentarios, id } = body

  try {
    const result = await Task.findByIdAndUpdate(
      id,
      { comentarios },
      { new: true }
    )

    return res.status(201).json(result)
  } catch (error) {
    return res.status(500).json('error')
  }
}
