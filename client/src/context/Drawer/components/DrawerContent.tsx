import { Box } from "@mui/material";
import { FC } from "react";
import AdminDrawer from "./AdminDrawer";
import MenuDrawerContent from "./MenuDrawer";
import ShoppingBagDrawerContent from "./ShoppingBagDrawer";

interface DrawerContentProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
  content: string;
}

const DrawerContent: FC<DrawerContentProps> = ({ toggleDrawer, content }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }} role="presentation">
      {content === "menu" ? (
        <MenuDrawerContent toggleDrawer={toggleDrawer} />
      ) : null}
      {content === "shoppingBag" ? (
        <ShoppingBagDrawerContent toggleDrawer={toggleDrawer} />
      ) : null}
      {content === "admin" ? <AdminDrawer toggleDrawer={toggleDrawer} /> : null}
    </Box>
  );
};

export default DrawerContent;
