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
      const user = await User.find()

      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
  } else if (method === 'PUT') {
    const { id } = body
    try {
      const result = await User.findByIdAndUpdate(id, body, { new: true })
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json('bad')
    }
  } else {
    return res.status(401)
  }
}
