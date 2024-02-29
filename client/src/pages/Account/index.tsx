import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const AccountPage = () => {
  const { user } = useAuth();

  return (
    <Container className="h-screen w-full">
      <Box className="h-full flex flex-row justify-center items-center">
        <Box className="h-full w-1/2 p-2">
          <Box className="flex items-center justify-center">
            {user ? (
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}`}
                className="rounded-full h-32 w-32"
                alt="avatar"
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: 28 }} />
            )}
          </Box>

          <Box className="flex items-center justify-center pt-2">
            <Typography variant="h6">{user ? user?.name : "User"}</Typography>
          </Box>

          <Box className="flex flex-row gap-2 justify-center pt-2">
            <EmailIcon />
            <Typography variant="body1">
              {user ? user?.email : "User Email"}
            </Typography>
          </Box>
        </Box>
        <Box className="h-full w-full p-2">
          <Box className="flex flex-row justify-center items-center gap-2">
            <FavoriteIcon />
            <Typography variant="h6">Favorilerim</Typography>
          </Box>

          <Box className="h-full flex flex-col justify-center items-center gap-2">
            <HeartBrokenIcon style={{ fontSize: 64 }} />
            <Typography variant="h6" textAlign={"center"}>
              Herhangi bir favori ürününüz yok :(
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountPage;
