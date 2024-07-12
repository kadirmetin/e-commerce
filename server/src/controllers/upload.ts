import { Request, Response } from "express";
import { cloudinary } from "../../config/cloudinary";

const UploadImage = async (req: Request, res: Response) => {
  try {
    const { images }: { images: string[] } = req.body;

    let promises: Promise<any>[] = [];

    images.forEach((image: string) => {
      promises.push(
        cloudinary.uploader.upload(image, {
          folder: "e-commerce",
        })
      );
    });

    const response = await Promise.all(promises);

    res.send(response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Sunucu hatası!" });
  }
};

export { UploadImage };
