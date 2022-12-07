import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import User from 'models/User'

export default async function loginHandler(req, res) {
  const { body, method } = req
  const { email, password } = body
  if (method !== 'POST') {
    return res.status(401).json('error')
  }
  if (!email || !password) {
    return res.status(400).json({ error: 'nombre & contraseña son requeridas' })
  }
  try {
    const datosUser = await User.findOne({ email })

    if (!datosUser.active) {
      return res.status(401).json({ error: 'las credenciales son erroneas' })
    }

    if (email === datosUser?.email && password === datosUser?.password) {
      const token = jwt.sign(
        {
          email: datosUser.email,
          username: datosUser.username,
          role: datosUser.role
        },
        process.env.JWT_SECRET_KEY
      ) // usar una variable de entorno env

      const serialized = serialize('TokenName', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/'
      })
      res.setHeader('Set-Cookie', serialized)
      return res.json({ role: datosUser.role }, 'login successfully')
    }
    return res.status(401).json({ error: 'las credenciales son erroneas' })
  } catch (error) {
    return res.status(500)
  }
}
