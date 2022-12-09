import User from 'models/User'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handle(req, res) {
  const { method } = req
  if (method !== 'GET') {
    return res.status(405)
  }
  try {
    const datos = await User.find()
    return res.status(200).json(datos)
  } catch (error) {
    return res.status(500)
  }
}
