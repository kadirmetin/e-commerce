import ClearIcon from "@mui/icons-material/Clear";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import type { FC } from "react";

interface ShoppingBagDrawerContentProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => () => void;
}

const ShoppingBagDrawerContent: FC<ShoppingBagDrawerContentProps> = ({
  toggleDrawer,
}) => {
  return (
    <Box className="h-full w-full flex flex-col p-2">
      <Box className="w-full flex flex-row justify-between items-center">
        <Typography variant="h6" p={2}>
          Sepet
        </Typography>
        <IconButton
          aria-label="exit"
          edge="start"
          color="inherit"
          onClick={toggleDrawer(false, "shoppingBag", "right")}
        >
          <ClearIcon color="inherit" fontSize="medium" />
        </IconButton>
      </Box>
      <Divider />

      <Box className="h-full flex flex-col justify-center items-center ">
        <LocalGroceryStoreIcon color="error" sx={{ fontSize: 96 }} />
        <Typography variant="body2" className="pt-2" textAlign="center">
          Sepetinizde herhangi bir ürün yok.
        </Typography>
      </Box>
    </Box>
  );
};

export default ShoppingBagDrawerContent;
