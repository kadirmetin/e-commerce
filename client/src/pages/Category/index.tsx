import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesProduct } from "../../api/apiService";
import { useSnackbar } from "../../context/ToastContext";

interface ProductProps {
  _id: string;
  name: string;
  image: string;
  price: string;
}

const CategoryIndex = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const categoryName = useRef<string | undefined>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (categoryId) {
          const response = await getCategoriesProduct({
            categoryId: categoryId,
          });

          if (response?.status === 200) {
            categoryName.current = response.data.categoryName;
            setProducts(response.data.products);
          } else {
            throw new Error(`${response?.data.message}`);
          }
        }
      } catch (error) {
        console.error(error);

        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, openSnackbar]);

  return (
    <Box className="h-screen w-full flex flex-col items-center">
      {loading ? (
        <Box className="h-full flex flex-col items-center justify-center">
          <Typography variant="h6">Yükleniyor...</Typography>
        </Box>
      ) : (
        <>
          <Box className="py-4">
            <Typography variant="h6">
              {categoryName.current} kategorisine ait ürünler
            </Typography>
          </Box>

          <Box className="grid grid-cols-1 gap-8 w-full pt-4 justify-items-center md:grid-cols-4">
            {products.map((product, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "100%",
                  height: 200,
                  maxHeight: 200,
                  maxWidth: 300,
                }}
                key={index}
                onClick={() => navigate(`/product/${product?._id}`)}
              >
                <img
                  src={`${product?.image}`}
                  alt="product photo"
                  className="object-contain w-full h-3/4 aspect-square"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#D9D9D9",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 4,
                    width: "100%",
                    height: "25%",
                  }}
                >
                  <Typography
                    variant="body2"
                    color={"black"}
                    className="w-2/3 text-left overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }}
                  >
                    {product?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={"black"}
                    className="w-1/3 text-right"
                  >
                    {product?.price}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CategoryIndex;
