import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useDrawer } from "../../../../context/Drawer/DrawerContext";

const AdminHeader = () => {
  const { toggleDrawer } = useDrawer();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
          <Typography variant="h6" noWrap component="div">
            SMA Shop - Admin
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminHeader;
