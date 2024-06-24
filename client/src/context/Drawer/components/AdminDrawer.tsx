import { Dashboard, Inventory } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminDrawerProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
}

const MenuDrawer: FC<AdminDrawerProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <Box className="w-full flex flex-col ">
      <Box>
        <Box className="w-full flex flex-row justify-between items-center px-1">
          <Typography variant="h6" p={2}>
            Admin
          </Typography>
          <IconButton
            aria-label="exit"
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer(false, "menu", "left")}
          >
            <ClearIcon color="inherit" fontSize="medium" />
          </IconButton>
        </Box>
        <Divider />
      </Box>

      <Box>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/admin");
            toggleDrawer(false, "menu", "left");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/admin/products");
            toggleDrawer(false, "menu", "left");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary={"Ürünler"} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
};

export default MenuDrawer;
