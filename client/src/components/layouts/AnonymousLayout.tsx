import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AnonymousLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AnonymousLayout;
