import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../api/apiService";
import { useSnackbar } from "../../../context/ToastContext";

type Props = {};

const ProductsIndex = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await getAllProducts();

        if (response?.status === 200) {
          const productsWithId = response.data.map(
            (product: any, index: number) => ({
              ...product,
              category: product.category.name,
              id: index + 1,
              productId: product._id,
              date: new Date(product.createdAt).toLocaleString("tr-TR", {
                timeZone: "Europe/Istanbul",
              }),
              price: `${product.price} ₺`,
            })
          );
          setProducts(productsWithId);
        } else {
          console.log(
            "Failed to fetch products, status code: ",
            response?.status
          );
        }
      } catch (error) {
        console.error("Error fetching products: ", error);

        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (id: number) => {
    // Düzenleme işlemi
    console.log("Düzenle: ", id);
  };

  const handleDeleteClick = (id: number) => {
    // Silme işlemi
    console.log("Sil: ", id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "productId", headerName: "Ürün ID", width: 125 },
    {
      field: "name",
      headerName: "Ürün adı",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Ücret",
      width: 110,
    },
    {
      field: "category",
      headerName: "Kategori",
      width: 150,
    },
    {
      field: "favoriteCount",
      headerName: "Favori",
      width: 110,
    },
    {
      field: "date",
      headerName: "Eklenme zamanı",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Eylemler",
      type: "actions",
      width: 150,
      getActions: (params: any) => [
        <Tooltip title="Düzenle">
          <GridActionsCellItem
            icon={<Edit color="info" />}
            label="Düzenle"
            onClick={() => handleEditClick(params.row.productId)}
          />
        </Tooltip>,
        <Tooltip title="Sil">
          <GridActionsCellItem
            icon={<Delete color="error" />}
            label="Sil"
            onClick={() => handleDeleteClick(params)}
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <Container maxWidth={"xl"} className="pt-8 gap-4">
      <Box className="flex flex-row justify-between items-center">
        <Typography variant="h5">Ürünler</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            navigate("/admin/products/add");
          }}
        >
          Ürün Ekle
        </Button>
      </Box>

      <Box className="pt-4">
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 15, 50, 100]}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default ProductsIndex;
