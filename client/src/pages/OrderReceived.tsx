import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderReceived = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.cartItems.length === 0) {
      navigate("/");
    } else {
      dispatch({
        type: "CLEAR_CART",
      });
    }
  }, []);

  return (
    <Box className="h-screen w-full flex flex-col justify-center items-center gap-2">
      <CheckCircleOutlineIcon color="primary" style={{ fontSize: 128 }} />
      <Typography variant="h5" color={"black"}>
        Siparişiniz Başarıyla Alındı
      </Typography>

      <Button variant="outlined" size="large" color="primary">
        Alışverişe Devam Et
      </Button>
    </Box>
  );
};

export default OrderReceived;
