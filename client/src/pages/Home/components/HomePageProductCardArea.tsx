import { Box, Typography } from "@mui/material";
import type { FC, MouseEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductCard from "../../../components/ProductCard";

interface CustomArrowProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

interface HomePageProductCardAreaProps {
  title: string;
  products: [] | undefined;
}

const CustomPrevArrow: FC<CustomArrowProps> = ({ onClick }) => (
  <Box
    className="absolute top-2/4 -translate-y-2/4 cursor-pointer bg-gray-200 p-2 z-[1] rounded-full flex flex-col items-center justify-center left-4"
    onClick={onClick}
  >
    <FaChevronLeft className="text-center text-lg" />
  </Box>
);

const CustomNextArrow: FC<CustomArrowProps> = ({ onClick }) => (
  <Box
    className="absolute top-2/4 -translate-y-2/4 cursor-pointer bg-gray-200 p-2 z-[1] rounded-full flex flex-col items-center justify-center right-4"
    onClick={onClick}
  >
    <FaChevronRight className="text-center" fontSize={"large"} />
  </Box>
);

const HomePageProductCardArea: FC<HomePageProductCardAreaProps> = ({
  title,
  products,
}) => {
  const settings = {
    infinite: false,
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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
