import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product:
    | { _id: string; name: string; price: number; image: string }
    | undefined;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: "90%",
        height: 300,
        maxHeight: 300,
        maxWidth: 300,
      }}
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
          p: 2,
          width: "100%",
          height: "25%",
        }}
      >
        <Typography variant="body2" color={"black"} className="w-3/4 pr-2">
          {product?.name}
        </Typography>
        <Typography variant="body2" color={"black"} className="w-1/4">
          {product?.price} ₺
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
