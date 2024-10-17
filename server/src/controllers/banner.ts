import { Request, Response } from 'express'
import BannerModal from '../models/Banner'

const getAllBanners = async (req: Request, res: Response) => {
  try {
    const banners = await BannerModal.find()
      .sort({
        createdAt: -1
      })
      .limit(10)

    return res.status(200).json({ banners })
  } catch (error) {
    console.error(error)

    return res.status(500).json({ message: 'Sunucu hatası!' })
  }
}

export { getAllBanners }
