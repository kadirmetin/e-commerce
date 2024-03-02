import { Box, Skeleton } from "@mui/material";

interface HomePageProductCardAreaSkeletonProps {
  count: number;
}

const HomePageProductCardAreaSkeleton: React.FC<
  HomePageProductCardAreaSkeletonProps
> = ({ count }) => {
  return (
    <Box my={2}>
      <Skeleton variant="text" width={"20%"} height={32} animation="pulse" />

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Box key={index} my={2} width={"100%"}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={240}
              animation="wave"
            />
            <Skeleton
              variant="text"
              width={"100%"}
              height={60}
              animation="wave"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePageProductCardAreaSkeleton;
