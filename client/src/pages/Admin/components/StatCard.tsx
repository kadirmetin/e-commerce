import { SvgIconComponent } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

type Props = {
  title: string;
  stat: number;
  icon: SvgIconComponent;
  loading: boolean;
};

const StatCard = (props: Props) => {
  return (
    <>
      <Card
        variant="outlined"
        className="w-full h-36 flex justify-center items-center md:w-80"
      >
        <CardContent className="flex flex-row h-full w-full">
          {props.loading ? (
            <Box className="flex h-full w-full justify-center items-center">
              <CircularProgress />
            </Box>
          ) : (
            <Box className="flex flex-row h-full w-full justify-between items-center p-1">
              <Box className="flex flex-col gap-4">
                <Typography variant="overline">{props.title}</Typography>
                <Typography alignItems={"center"} variant="h3">
                  {props.stat}
                </Typography>
              </Box>
              <Box>
                <props.icon style={{ fontSize: 64 }} />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default StatCard;
