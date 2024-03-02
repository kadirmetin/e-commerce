import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";

interface ShoppingBagDrawerContentProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
}

const ShoppingBagDrawerContent: FC<ShoppingBagDrawerContentProps> = ({
  toggleDrawer,
}) => {
  const { state, dispatch } = useCart();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalPrice = 0;

    state.cartItems.forEach((product) => {
      const productPrice = Number(product.product.price) * product.quantity;
      totalPrice += productPrice;
    });

    setTotal(totalPrice);
  }, [state.cartItems]);

  return (
    <Box className="h-screen w-full flex flex-col">
      <Box className="w-full h-[10%] flex flex-row justify-between items-center pt-2 px-2">
        <Typography variant="h6" p={2}>
          Sepet
        </Typography>
        <Box className="flex flex-row h-full gap-4 items-center justify-between">
          {state.cartItems.length !== 0 && (
            <IconButton
              aria-label="delete"
              edge="start"
              color="error"
              onClick={() => {
                dispatch({
                  type: "CLEAR_CART",
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="exit"
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer(false, "shoppingBag", "right")}
          >
            <ClearIcon color="inherit" fontSize="medium" />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {state.cartItems.length === 0 ? (
        <Box className="h-full w-full flex flex-col justify-center items-center overflow-y-auto">
          <Box className="flex flex-col items-center justify-center">
            <LocalGroceryStoreIcon color="inherit" sx={{ fontSize: 96 }} />
            <Typography variant="body2" className="pt-2" textAlign="center">
              Sepetinizde herhangi bir ürün yok.
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box className="h-full w-full flex flex-col justify-center items-center overflow-y-auto">
            <Box className="h-full w-full flex flex-col items-center justify-between">
              <Box className="w-full h-full flex flex-col items-center">
                {state.cartItems.map((product, index) => (
                  <Box
                    key={index}
                    className="w-fit h-fit flex flex-row justify-between items-center gap-4 p-4"
                  >
                    <Box className="h-full w-1/3 rounded-xl">
                      <img
                        src={product.product.image}
                        className="object-contain aspect-square"
                      />
                    </Box>
                    <Box className="h-full w-2/3 flex flex-row justify-between items-center gap-4">
                      <Box className="h-full w-3/4 flex flex-col">
                        <Typography variant="body1" fontWeight={600}>
                          {product.product.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="tracking-widest"
                          fontWeight={900}
                        >
                          {(
                            Number(product.product.price) * product.quantity
                          ).toFixed(2)}
                          ₺
                        </Typography>
                        <Box className="w-full flex flex-row items-center justify-between border-2 rounded-xl md:w-1/2">
                          <IconButton
                            size="medium"
                            onClick={() => {
                              dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: product.product.id,
                              });
                            }}
                          >
                            <RemoveCircleIcon
                              fontSize="medium"
                              color="primary"
                            />
                          </IconButton>
                          <Typography>{product.quantity}</Typography>
                          <IconButton
                            size="medium"
                            onClick={() => {
                              dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: product.product.id,
                              });
                            }}
                          >
                            <AddCircleIcon fontSize="medium" color="primary" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box
                        className="h-full w-1/4 flex flex-col justify-center items-center"
                        onClick={() => {
                          toggleDrawer(false, "shoppingBag", "right");

                          navigate(`/product/${product.product.id}`);
                        }}
                      >
                        <IconButton>
                          <ArrowRightIcon htmlColor="#000" fontSize="large" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            className="w-full h-[10%] flex flex-row justify-between items-center px-2 bg-[#BFBFBF] cursor-pointer hover:bg-[#adadad]"
            onClick={() => {
              toggleDrawer(false, "shoppingBag", "right");

              navigate("/orderReceived");
            }}
          >
            <Box className="flex flex-col items-center">
              <Typography variant="body1" fontWeight={600}>
                Toplam Tutar:
              </Typography>
              <Typography
                variant="body1"
                fontWeight={900}
                className="tracking-widest"
              >
                {total.toFixed(2)}₺
              </Typography>
            </Box>
            <Box className="flex flex-row h-full justify-center items-center">
              <Typography variant="body1">Ödemeye geç</Typography>
              <ArrowRightIcon htmlColor="#000" fontSize="large" />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ShoppingBagDrawerContent;
