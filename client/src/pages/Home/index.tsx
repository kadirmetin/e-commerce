import { Container } from "@mui/material";
import HomePageProductCardArea from "./components/HomePageProductCardArea";
import Slider from "./components/Slider";

const index = () => {
  return (
    <Container>
      <Slider />

      <HomePageProductCardArea title="Yeni Sezon" />
      <HomePageProductCardArea title="En Popüler" />
    </Container>
  );
};

export default index;
