import { Box, Typography } from "@mui/material";

const Card = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "relative",
        marginBottom: "-50px",
        cursor: "pointer",
      }}
    >
      <img
        src="https://picsum.photos/600"
        alt="product photo"
        height={"90%"}
        width={"90%"}
        className="rounded-md"
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          top: "-50px",
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#D9D9D9",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <Typography variant="h6" color={"black"}>
            Test
          </Typography>
          <Typography variant="h6" color={"black"} className="">
            0$
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
