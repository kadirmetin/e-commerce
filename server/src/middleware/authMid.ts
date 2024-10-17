import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserModal from '../models/User'

interface ReqProps extends Request {
  userId?: string
}

const verifyToken = (req: ReqProps, res: Response, next: NextFunction) => {
  const tokenWithBearer = req.header('Authorization')

  if (!tokenWithBearer) {
    return res.status(401).json({ error: 'Yetkisiz giriş!' })
  }

  const token = tokenWithBearer.replace('Bearer ', '')

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    req.body.userId = decodedToken.userId

    next()
  } catch (error) {
    console.error(error)

    res.status(401).json({ error: 'Geçersiz token!' })
  }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'Hatalı veya eksik bilgi!' })
    }

    const user = await UserModal.findById(userId)

    if (!user) {
      return res.status(400).json({ error: 'Geçersiz id!' })
    }

    if (user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Yetkisiz işlem!' })
    }

    next()
  } catch (error) {
    console.error(error)

    res.status(400).json({ error: 'Doğrulama sırasında bir hata oluştu' })
  }
}

export { isAdmin, verifyToken }
