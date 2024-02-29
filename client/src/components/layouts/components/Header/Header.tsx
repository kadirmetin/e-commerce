import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Container,
  IconButton,
  InputBase,
  Link,
  Menu,
  MenuItem,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useSnackbar } from "../../../../context/ToastContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  display: "flex",
  width: "100%",
  alignItems: "center",
  maxHeight: 40,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
          <IconButton aria-label="menu" edge="start" color="inherit">
            <MenuIcon style={{ fontSize: 28 }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link href="/" underline="none" color={"black"}>
            <Typography
              variant="h6"
              fontWeight={"semibold"}
              letterSpacing={5}
              className="select-none"
            >
              SMA SHOP
            </Typography>
          </Link>
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
                  <MenuItem key="favorites" onClick={() => {}}>
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

          <IconButton aria-label="shoppingbag" edge="start" color="inherit">
            <ShoppingBagIcon style={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </Container>
    </nav>
  );
};

export default Header;
