import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface SimpleSliderProps {}

const SimpleSlider: FC<SimpleSliderProps> = ({}) => {
  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <Slider {...settings} className="w-full">
      <Box
        sx={{
          backgroundImage: `url("https://picsum.photos/1200/630")`,
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "60%",
            alignItems: "center",
            paddingLeft: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",

              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            Test
          </Typography>
        </Box>
      </Box>
    </Slider>
  );
};

export default SimpleSlider;
