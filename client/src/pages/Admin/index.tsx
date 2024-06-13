import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getTotalCategoryCount,
  getTotalOrderCount,
  getTotalProductsCount,
  getTotalUserCount,
} from "../../api/apiService";
import { useSnackbar } from "../../context/ToastContext";
import StatCard from "./components/StatCard";

type Props = {};

const AdminIndex = (props: Props) => {
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [statics, setStatics] = useState({
    product: 0,
    category: 0,
    order: 0,
    user: 0,
  });

  useEffect(() => {
    const getStatics = async () => {
      try {
        setLoading(true);
        const productCount = await getTotalProductsCount();
        const categoryCount = await getTotalCategoryCount();
        const orderCount = await getTotalOrderCount();
        const userCount = await getTotalUserCount();

        if (productCount && categoryCount) {
          setStatics({
            product: productCount.totalProductCount,
            category: categoryCount.totalCategoryCount,
            order: orderCount.totalOrderCount,
            user: userCount.totalUserCount,
          });
        }
      } catch (error) {
        console.error(error);

        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    getStatics();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" className="py-4">
        Dashboard
      </Typography>
      <Box className="flex flex-col justify-between items-center gap-4 md:flex-row">
        <StatCard
          loading={loading}
          stat={statics.user}
          title="Toplam Kayıtlı Üye Sayısı"
          icon={PersonIcon}
        />
        <StatCard
          loading={loading}
          stat={statics.product}
          title="Toplam Ürün Sayısı"
          icon={InventoryIcon}
        />
        <StatCard
          loading={loading}
          stat={statics.category}
          title="Toplam Kategori Sayısı"
          icon={CategoryIcon}
        />
        <StatCard
          loading={loading}
          stat={statics.order}
          title="Toplam Sipariş Sayısı"
          icon={ShoppingBasketIcon}
        />
      </Box>
    </Container>
  );
};

export default AdminIndex;
