import { Box, Skeleton } from "@mui/material";

const FavoritesCardSkeleton = () => {
  return (
    <Box className="flex flex-col items-center justify-center w-full h-full min-h-52">
      <Box className="w-full h-3/4">
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: "100%", width: "100%" }}
        />
      </Box>
      <Skeleton variant="text" animation="pulse" className="w-full h-1/4" />
    </Box>
  );
};

export default FavoritesCardSkeleton;
