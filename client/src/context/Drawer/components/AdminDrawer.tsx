import ClearIcon from "@mui/icons-material/Clear";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { FC } from "react";

interface AdminDrawerProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
}

const MenuDrawer: FC<AdminDrawerProps> = ({ toggleDrawer }) => {
  return (
    <Box className="h-full w-full flex flex-col p-2">
      <Box className="w-full flex flex-row justify-between items-center">
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

      <Typography>TEST - ADMIN</Typography>
    </Box>
  );
};

export default MenuDrawer;
