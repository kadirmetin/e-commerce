import { Box, Skeleton } from "@mui/material";

const ProductIndexSkeleton = () => {
  return (
    <>
      <Box className="flex flex-col w-full md:w-2/5">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={500}
          animation="wave"
        />
      </Box>
      <Box className="flex flex-col w-full md:w-3/5">
        <Skeleton variant="text" width="80%" height={50} animation="wave" />
        <Skeleton variant="text" width="80%" animation="pulse" height={32} />
        <Skeleton variant="text" width="30%" animation="pulse" height={40} />
        <Skeleton variant="text" width="25%" animation="pulse" height={25} />
        <Box className="flex flex-row mt-2">
          <Skeleton
            variant="rectangular"
            width={"70%"}
            animation="wave"
            height={30}
          />
          <Skeleton
            variant="rounded"
            width={"10%"}
            animation="wave"
            className="ml-2"
            height={30}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductIndexSkeleton;
