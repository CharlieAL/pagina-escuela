import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import User from 'models/User'
import { dbConnection } from 'utils/db'

dbConnection()

export default async function handler(req, res) {
  const { body, method } = req
  const { email, password } = body

  User.findOne({ email }, function (erro, datosUser) {
    if (erro) {
      return res.status(500).json({
        ok: false,
        err: erro
      })
    }

    // Verifica que exista un usuario con el mail escrita por el usuario.
    if (!datosUser) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrectos'
        }
      })
    }
    if (!datosUser.active) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no tiene permiso'
        }
      })
    }
    if (password !== datosUser.password) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrectos'
        }
      })
    }

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
    return res.json({
      ok: true,
      usuario: datosUser
    })
  })

  // try {
  //   console.log(email)
  //   const user = await User.findOne({ email }).exec()
  //   return res.status(200).json({ user })
  // } catch (error) {
  //   console.log(error)
  //   return res.status(500).end()
  // }
}
