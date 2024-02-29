import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface ReqProps extends Request {
  userId?: string;
}

const verifyToken = (req: ReqProps, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Yetkisiz giriş!" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: "Geçersiz token!" });
  }
};

export { verifyToken };
