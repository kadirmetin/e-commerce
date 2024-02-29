import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useDrawer } from "../../../../context/Drawer/DrawerContext";
import { useSnackbar } from "../../../../context/ToastContext";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { toggleDrawer } = useDrawer();

  const { user, token, setTokenandUser } = useAuth();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate(0);
    setTokenandUser(null, null);

    openSnackbar("Çıkış işlemi başarılı", "success");
  };

  return (
    <nav
      style={{
        overflowY: "auto",
        maxHeight: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: 64,
        }}
      >
        <Box>
          <IconButton
            aria-label="menu"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true, "menu", "left")}
          >
            <MenuIcon style={{ fontSize: 28 }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            variant="h6"
            fontWeight={"semibold"}
            letterSpacing={5}
            className="select-none"
          >
            SMA SHOP
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="account"
            edge="start"
            color="inherit"
            onClick={handleClick}
          >
            {user ? (
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}`}
                className="rounded-3xl h-8 w-8"
                alt="avatar"
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: 28 }} />
            )}
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {token
              ? [
                  <MenuItem key="account" onClick={() => navigate("/account")}>
                    Hesabım
                  </MenuItem>,
                  <MenuItem
                    key="favorites"
                    onClick={() => navigate("/account")}
                  >
                    Favoriler
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    Çıkış Yap
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="login"
                    onClick={() => navigate("/account/login")}
                  >
                    Giriş Yap
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={() => navigate("/account/register")}
                  >
                    Üye Ol
                  </MenuItem>,
                ]}
          </Menu>

          <IconButton
            aria-label="shoppingbag"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true, "shoppingBag", "right")}
          >
            <ShoppingBagIcon style={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </Container>
    </nav>
  );
};

export default Header;
