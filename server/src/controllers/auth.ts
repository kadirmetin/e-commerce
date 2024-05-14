import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import UserModal from "../models/User";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen bütün alanları doldurunuz." });
    }

    const isEmailValid = (email: string) => validator.isEmail(email);

    if (!isEmailValid(email)) {
      return res
        .status(400)
        .json({ message: "Lütfen geçerli bir e-posta adresi girin." });
    }

    const isExistingUser = await UserModal.findOne({
      email: email,
    });

    if (isExistingUser) {
      return res.status(400).json({ message: "Bu e-posta adresi kullanımda." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Parola 8 karakterden daha az olamaz." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModal.create({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Üyelik oluşturma işlemi başarılı." });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Üyelik oluşturulurken bir hata oluştu.", error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen bütün alanları doldurunuz." });
    }

    const isEmailValid = (email: string) => validator.isEmail(email);

    if (!isEmailValid(email)) {
      return res
        .status(400)
        .json({ message: "Lütfen geçerli bir e-posta adresi girin." });
    }

    const isExistingUser = await UserModal.findOne({
      email: email,
    });

    if (!isExistingUser) {
      return res
        .status(400)
        .json({ message: "Geçersiz e-posta veya şifre girdiniz." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Geçersiz e-posta veya şifre girdiniz." });
    }

    const token = jwt.sign(
      { userId: isExistingUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1w",
      }
    );

    res.status(200).json({
      message: "Giriş işlemi başarılı",
      token: token,
      user: {
        userId: isExistingUser.id,
        name: isExistingUser.name,
        email: isExistingUser.email,
        favorites: isExistingUser.favorites,
        role: isExistingUser.role,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Giriş işlemi sırasında bir hata oluştu." });
  }
};

export { login, register };
