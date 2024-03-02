import { useEffect, useState } from "react";
import { getNewProducts, getPopularProducts } from "../../api/apiService";
import HomePageProductCardArea from "./components/HomePageProductCardArea";
import HomePageProductCardAreaSkeleton from "./components/Skeletons/HomePageProductCardAreaSkeleton";
import Slider from "./components/Slider";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [newProducts, setNewProducts] = useState();
  const [popularProducts, setPopularProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        setNewProducts(await getNewProducts());
        setPopularProducts(await getPopularProducts());
      } catch (error) {
        console.error(error);

        alert((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Slider />
      {loading ? (
        <>
          <HomePageProductCardAreaSkeleton count={4} />
          <HomePageProductCardAreaSkeleton count={4} />
        </>
      ) : (
        <>
          <HomePageProductCardArea title="Yeni Sezon" products={newProducts} />
          <HomePageProductCardArea
            title="En Popüler"
            products={popularProducts}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
