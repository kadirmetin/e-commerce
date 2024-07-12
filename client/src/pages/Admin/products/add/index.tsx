import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { addNewProduct, getAllCategories } from "../../../../api/apiService";
import { useAuth } from "../../../../context/AuthContext";
import { useSnackbar } from "../../../../context/ToastContext";
import { productSchema } from "../../../../schemas";
import ImageUploader from "./components/ImageUploader";

type Props = {};

const ProductAddIndex = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const { token } = useAuth();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      productName: "",
      category: "",
      brand: "",
      price: 0,
      description: "",
      images: [],
    },
    validationSchema: productSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log("VALUES:", values);

      try {
        if (!values) {
          throw new Error("Values not defined!");
        }

        setLoading(true);

        const response = await addNewProduct({ token, values });

        if (response?.status === 201) {
          openSnackbar("Ürün başarıyla eklendi!", "success");

          resetForm();
        } else {
          throw new Error("Ürün eklenirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);

        const response = await getAllCategories();

        if (response?.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error(error);

        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleImageUpload = (urls: string[]) => {
    setFieldValue("images", urls);
  };

  const handleImageRemove = (index: number) => {
    setFieldValue(
      "images",
      values.images.filter((_, i) => i !== index)
    );
  };

  const handleImageChange = (images: string[]) => {
    setFieldValue("images", images);
  };

  return (
    <Container maxWidth="xl" className="pt-8 gap-4">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box className="flex flex-row justify-between items-center">
          <Typography variant="h5">Ürün Ekle</Typography>
          <Button variant="contained" startIcon={<Save />} type="submit">
            Kaydet
          </Button>
        </Box>

        <Box className="mt-4 p-4 rounded-md bg-gray-100 mb-2">
          <FormControl className="flex flex-col w-full gap-4">
            <Box className="w-full flex flex-row gap-4">
              <TextField
                label="Ürün adı"
                name="productName"
                value={values.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                fullWidth
                className="w-2/3"
                error={touched.productName && Boolean(errors.productName)}
                helperText={touched.productName && errors.productName}
              />

              <TextField
                id="filled-select-category"
                name="category"
                select
                label="Kategori"
                variant="outlined"
                className="w-1/3"
                defaultValue={""}
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
              >
                {loading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  categories.map((category, index) => (
                    <MenuItem key={index} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Box>
            <Box className="w-full flex flex-row gap-4">
              <TextField
                label="Marka"
                name="brand"
                required
                fullWidth
                className="w-2/4"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
              />
              <TextField
                label="Fiyat"
                name="price"
                type="number"
                required
                fullWidth
                className="w-2/4"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", min: 0 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₺</InputAdornment>
                  ),
                }}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
            </Box>
            <Box className="w-full flex">
              <TextField
                label="Açıklama"
                name="description"
                multiline
                rows={5}
                fullWidth
                required
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Box>

            <Box
              className={`${
                touched.images && Boolean(errors.images) ? "border-red-500" : ""
              } w-full h-80 flex flex-col border-2 rounded-xl border-dashed`}
            >
              <ImageUploader
                onUpload={handleImageUpload}
                onRemove={handleImageRemove}
                onChange={handleImageChange}
              />
            </Box>
            {touched.images && Boolean(errors.images) && (
              <Box>
                <Typography color="error">{errors.images}</Typography>
              </Box>
            )}
          </FormControl>
        </Box>
      </form>
    </Container>
  );
};

export default ProductAddIndex;
