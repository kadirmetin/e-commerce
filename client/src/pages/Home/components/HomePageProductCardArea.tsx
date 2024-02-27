import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "../../../components/Card";

interface HomePageProductCardAreaProps {
  title: string;
}

const HomePageProductCardArea: FC<HomePageProductCardAreaProps> = ({
  title,
}) => {
  const settings = {
    infinite: false,
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Typography variant="h6">{title}</Typography>

      <Slider {...settings}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Slider>
    </Box>
  );
};

export default HomePageProductCardArea;
