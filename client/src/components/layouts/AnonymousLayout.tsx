import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const AnonymousLayout = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>AnonymousLayout</Typography>
        <Outlet />
      </Box>
    </Container>
  );
};

export default AnonymousLayout;
