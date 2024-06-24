import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDrawer } from "../../../../context/Drawer/DrawerContext";

const AdminHeader = () => {
  const { toggleDrawer } = useDrawer();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex justify-between items-center">
          <Box className="flex flex-row items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(true, "admin", "left")}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              className="cursor-pointer"
              onClick={() => {
                navigate("/admin");
              }}
            >
              SMA Shop - Admin
            </Typography>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="exit"
            onClick={() => navigate("/")}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminHeader;
