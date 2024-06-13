import { ExpandLess, ExpandMore, Inventory } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

interface AdminDrawerProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
}

const MenuDrawer: FC<AdminDrawerProps> = ({ toggleDrawer }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Inventory />
          </ListItemIcon>
          <ListItemText primary="Ürünler" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Ürün Ekle" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Ürün Listesi" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Kategoriler" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Markalar" />
            </ListItemButton>
          </List>
        </Collapse>
      </Box>
    </Box>
  );
};

export default MenuDrawer;
