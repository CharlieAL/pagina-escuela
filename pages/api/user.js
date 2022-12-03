import { verify } from 'jsonwebtoken'

export default function userHandler(req, res) {
  const { TokenName } = req.cookies
  if (!TokenName) return res.json('no token')
  try {
    const user = verify(TokenName, 'secret')
    return res.json(user)
  } catch (error) {
    return res.status(401).json({ error: 'token invalido' })
  }
}
