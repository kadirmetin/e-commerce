import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#BFBFBF",
          height: "25vh",
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          SMA SHOP
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography>Anasayfa</Typography>
          <Typography>Hakkımızda</Typography>
          <Typography>İletişim</Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
