import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFavorite,
  getProductInfo,
  removeFavorite,
} from "../../api/apiService";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useSnackbar } from "../../context/ToastContext";
import ProductIndexSkeleton from "./components/ProductIndexSkeleton";

interface ProductInfo {
  _id: string;
  name: string;
  desc: string;
  image: string;
  price: string;
  category: string;
  favoriteCount: number;
}

const ProductIndex = () => {
  const { productId } = useParams();
  const { token, user, updateUserFavorites } = useAuth();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { dispatch } = useCart();

  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (!productId) {
          navigate("/404", { replace: true });
        } else {
          const response = await getProductInfo({ productId });

          if (response && response.status === 200) {
            setProductInfo(response.data.product);
          } else {
            navigate("/404", { replace: true });
          }
        }
      } catch (error) {
        console.error(
          "Error fetching product info: ",
          (error as Error).message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  const handleAddFavorite = async (productId: string) => {
    try {
      if (!token) {
        alert("Favorilerinize eklemek için giriş yapmalısınız!");
      } else {
        if (user && user.favorites) {
          const isProductInFavorites = user.favorites.includes(productId);

          if (!isProductInFavorites) {
            const response = await addFavorite({ productId, token });

            if (response && response.status === 200) {
              const newFavorites = [...(user.favorites || []), productId];

              updateUserFavorites(newFavorites);

              const updatedFavoritesCount =
                (productInfo?.favoriteCount || 0) + 1;

              setProductInfo((prevInfo) => ({
                ...prevInfo!,
                favoriteCount: updatedFavoritesCount,
              }));
            } else {
              openSnackbar(`${response?.data?.message || "Error"}`, "error");
            }
          }
        }
      }
    } catch (error) {
      console.error(
        "An error occurred while adding the product to favorites: ",
        (error as Error).message
      );
    }
  };

  const handleRemoveFavorite = async (productId: string) => {
    try {
      if (!token) {
        alert("Favorilerinize eklemek için giriş yapmalısınız!");
      } else {
        if (user && user.favorites) {
          const isProductInFavorites = user.favorites.includes(productId);

          if (isProductInFavorites) {
            const response = await removeFavorite({ productId, token });

            if (response && response.status === 200) {
              const newFavorites = user.favorites.filter(
                (favId) => favId !== productId
              );

              updateUserFavorites(newFavorites);

              const updatedFavoritesCount =
                (productInfo?.favoriteCount || 0) - 1;

              setProductInfo((prevInfo) => ({
                ...prevInfo!,
                favoriteCount: updatedFavoritesCount,
              }));
            } else {
              openSnackbar(`${response?.data?.message || "Error"}`, "error");
            }
          }
        }
      }
    } catch (error) {
      console.error(
        "An error occurred while removing the product from favorites: ",
        (error as Error).message
      );
    }
  };

  const handleAddToCart = (productInfo: ProductInfo | null) => {
    try {
      if (productInfo) {
        const { _id, name, price, image } = productInfo;

        dispatch({
          type: "ADD_TO_CART",
          payload: {
            id: _id,
            name: name,
            price: price,
            image: image,
          },
        });

        openSnackbar("Ürün sepete eklendi", "success");
      } else {
        throw new Error("Ürün bilgileri eksik");
      }
    } catch (error) {
      console.error(error);
      openSnackbar(`${error}`, "error");
    }
  };

  return (
    <Box className="flex flex-col h-full w-full items-center gap-5 p-2 md:flex-row md:items-start md:h-screen">
      {loading ? (
        <ProductIndexSkeleton />
      ) : (
        <>
          <Box className="flex flex-col w-2/5 items-center">
            <Box className="border h-[500px] w-[95vw] md:w-full">
              <img
                src={productInfo?.image}
                alt="product"
                className="h-full w-full object-contain aspect-square"
              />
            </Box>
          </Box>
          <Box className="flex flex-col h-full w-full gap-3 md:w-3/5">
            <Typography variant="h4">{productInfo?.name}</Typography>
            <Typography variant="body1">{productInfo?.desc}</Typography>
            <Typography variant="h5" className="tracking-wider">
              {productInfo?.price}₺
            </Typography>
            <Typography variant="body2">
              {productInfo?.favoriteCount} Favori
            </Typography>

            <Box className="w-full flex flex-row gap-1 justify-between items-center">
              <Button
                variant="contained"
                size="large"
                className="w-11/12 md:w-3/4"
                onClick={() => handleAddToCart(productInfo)}
              >
                Sepete Ekle
              </Button>
              <Box className="w-1/12 md:w-1/4 items-center justify-center">
                {user?.favorites ? (
                  user.favorites.includes(productId || "") ? (
                    <IconButton
                      onClick={() => handleRemoveFavorite(productId || "")}
                      size="large"
                      color="error"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleAddFavorite(productId || "")}
                      size="large"
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  )
                ) : null}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductIndex;
