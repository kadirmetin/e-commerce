import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductCard from "../../../components/ProductCard";

interface HomePageProductCardAreaProps {
  title: string;
  products: [] | undefined;
}

const HomePageProductCardArea: FC<HomePageProductCardAreaProps> = ({
  title,
  products,
}) => {
  const settings = {
    infinite: false,
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 875,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        my: 3,
      }}
    >
      <Typography variant="h6">{title}</Typography>

      <Slider {...settings}>
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Slider>
    </Box>
  );
};

export default HomePageProductCardArea;
