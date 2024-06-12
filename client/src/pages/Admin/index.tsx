import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getTotalCategoryCount,
  getTotalProductsCount,
} from "../../api/apiService";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "../../context/ToastContext";
import StatCard from "./components/StatCard";

type Props = {};

const AdminIndex = (props: Props) => {
  const { user } = useAuth();
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [statics, setStatics] = useState({
    product: 0,
    category: 0,
  });

  useEffect(() => {
    const getStatics = async () => {
      try {
        setLoading(true);
        const productCount = await getTotalProductsCount();

        const categoryCount = await getTotalCategoryCount();

        if (productCount && categoryCount) {
          setStatics({
            product: productCount.totalProductCount,
            category: categoryCount.totalCategoryCount,
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
    <Container maxWidth="xl" className="mt-4">
      <Box className="flex flex-col justify-between items-center gap-4 md:flex-row">
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
      </Box>
    </Container>
  );
};

export default AdminIndex;
