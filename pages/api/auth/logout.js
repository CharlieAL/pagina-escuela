import { serialize } from 'cookie'
import { verify } from 'jsonwebtoken'

export default function logOutHandler(req, res) {
  const { TokenName } = req.cookies
  if (!TokenName) return res.status(401).json('no token')
  try {
    verify(TokenName, process.env.JWT_SECRET_KEY)
    const serialized = serialize('TokenName', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })
    res.setHeader('Set-Cookie', serialized)
    return res.status(200).json('logout exitoso').end()
  } catch (error) {
    return res.status(401).json('token invalido').end()
  }
}
