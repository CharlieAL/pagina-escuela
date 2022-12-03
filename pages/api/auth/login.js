import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

export default function loginHandler(req, res) {
  const { body } = req
  const { email, password } = body
  // checar en la base de datos si existe estas credenciales.
  // encriptar la contraseña  y hacer verificaciones.
  const datosUser = {
    email: 'admin@local.com',
    password: 'admin',
    username: 'roberto',
    role: 'admin'
  }

  if (email === datosUser.email && password === datosUser.password) {
    const token = jwt.sign(
      {
        email: datosUser.email,
        username: datosUser.username,
        role: datosUser.role
      },
      'secret'
    ) // usar una variable de entorno env

    const serialized = serialize('TokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })
    res.setHeader('Set-Cookie', serialized)
    return res.json('login successfuly')
  }

  return res.status(401).json({ error: 'las credenciales son erroneas' })
}
