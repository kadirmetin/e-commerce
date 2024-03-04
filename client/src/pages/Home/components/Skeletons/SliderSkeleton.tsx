import { Skeleton } from "@mui/material";

const SliderSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        height: 500,
        width: "100%",
        borderRadius: 10,
      }}
    />
  );
};

export default SliderSkeleton;
