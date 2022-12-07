import { dbConnection } from 'utils/db'
import User from 'models/User'

dbConnection()
export default async function handler(req, res) {
  const { method, body } = req
  if (method === 'POST') {
    if (body.email === '') {
      return res.status(401).json('error email es requerido')
    }
    try {
      const newUser = await User.create(body)
      newUser.save()
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(500).json('error al subir')
    }
  } else if (method === 'GET') {
    try {
      const users = await User.find()

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(401)
  }
}
