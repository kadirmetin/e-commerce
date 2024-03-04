import { Box, Typography } from "@mui/material";
import type { FC, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAllBanners } from "../../../api/apiService";
import { useSnackbar } from "../../../context/ToastContext";
import { useDeviceType } from "../../../hooks/deviceType";
import SliderSkeleton from "./Skeletons/SliderSkeleton";

interface CustomArrowProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

interface BannerProps {
  title: string;
  image: string;
  category: string;
}

const CustomPrevArrow: FC<CustomArrowProps> = ({ onClick }) => (
  <Box
    className="absolute top-2/4 -translate-y-2/4 cursor-pointer bg-white p-2 z-[1] rounded-full flex flex-col items-center justify-center left-4"
    onClick={onClick}
  >
    <FaChevronLeft className="text-center" fontSize={"large"} />
  </Box>
);

const CustomNextArrow: FC<CustomArrowProps> = ({ onClick }) => (
  <Box
    className="absolute top-2/4 -translate-y-2/4 cursor-pointer bg-white p-2 z-[1] rounded-full flex flex-col items-center justify-center right-4"
    onClick={onClick}
  >
    <FaChevronRight className="text-center" fontSize={"large"} />
  </Box>
);

const SimpleSlider = () => {
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState<BannerProps[]>([]);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        const response = await getAllBanners();

        if (response?.status === 200) {
          setBanners(response.data.banners);
        }
      } catch (error) {
        console.error(error);

        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: deviceType !== "Mobile" ? true : false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    draggable: false,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <>
      {loading ? (
        <SliderSkeleton />
      ) : (
        <Slider {...settings} className="w-full">
          {banners.map((banner, index) => {
            return (
              <Box
                key={index}
                sx={{
                  backgroundImage: `url("${banner.image}")`,
                  height: "500px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/category/${banner.category}`)}
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
                      p: "1%",

                      ":hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {banner.title}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Slider>
      )}
    </>
  );
};

export default SimpleSlider;
