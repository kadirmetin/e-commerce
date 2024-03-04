import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductInfo } from "../../../api/apiService";
import { useSnackbar } from "../../../context/ToastContext";
import FavoritesCardSkeleton from "./Skeletons/FavoritesCardSkeleton";

interface FavoritesCardProps {
  productId: string;
}

interface Product {
  image: string;
  _id: string;
  name: string;
}

const FavoritesCard: FC<FavoritesCardProps> = ({ productId }) => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        if (productId) {
          const response = await getProductInfo({ productId: productId });

          if (response && response.status === 200) {
            setProduct(response.data.product);
          } else {
            openSnackbar(`${response?.data.message}`, "error");
          }
        }
      } catch (error) {
        console.error(error);
        openSnackbar(`${(error as Error).message}`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  return (
    <>
      {loading ? (
        <FavoritesCardSkeleton />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            width: "90%",
            height: 200,
            maxHeight: 200,
            maxWidth: 300,
          }}
          onClick={() => navigate(`/product/${product?._id}`)}
        >
          <img
            src={`${product?.image}`}
            alt="product photo"
            className="rounded-md object-contain w-full h-3/4 aspect-square"
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
              className="w-full text-center overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {product?.name}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FavoritesCard;
