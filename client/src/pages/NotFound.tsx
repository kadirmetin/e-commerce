import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      gap={2}
    >
      <Typography variant="h1" fontWeight={900} textAlign={"center"}>
        Oops!
      </Typography>
      <Typography variant="h4" textAlign={"center"}>
        404 - SAYFA BULUNAMADI
      </Typography>
      <Typography textAlign={"center"}>
        Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak
        kullanılamıyor olabilir.
      </Typography>

      <Button variant="outlined" onClick={() => navigate("/")}>
        ANASAYFA
      </Button>
    </Box>
  );
};

export default NotFound;
