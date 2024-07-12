import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  productName: Yup.string().required("Ürün adı zorunludur."),
  category: Yup.string().required("Kategori zorunludur."),
  brand: Yup.string().required("Marka zorunludur."),
  price: Yup.number()
    .positive("Fiyat pozitif bir sayı olmalıdır.")
    .integer("Fiyat tam sayı olmalıdır.")
    .required("Fiyat zorunludur."),
  description: Yup.string().required("Açıklama zorunludur."),
  images: Yup.array()
    .min(1, "En az bir resim yüklemelisiniz.")
    .required("Resimler zorunludur."),
});
