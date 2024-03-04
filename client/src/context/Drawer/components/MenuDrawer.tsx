import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CiLaptop } from "react-icons/ci";
import { FaCamera } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { TbToolsKitchen } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../api/apiService";
import { useSnackbar } from "../../ToastContext";

interface MenuDrawerProps {
  toggleDrawer: (
    newOpen: boolean,
    drawerContent: string,
    anchor: "top" | "right" | "bottom" | "left"
  ) => void;
}

interface CategoriesProps {
  _id: string;
  name: string;
}

const categoryIcons: Record<string, JSX.Element> = {
  "Akıllı Telefonlar": <PhoneIphoneIcon fontSize="medium" />,
  Ayakkabılar: <GiRunningShoe fontSize="medium" />,
  "Dizüstü Bilgisayarlar": <CiLaptop fontSize="medium" />,
  Kameralar: <FaCamera fontSize="medium" />,
  "Kişisel Bakım": <IoPerson fontSize="medium" />,
  "Mutfak Aletleri": <TbToolsKitchen fontSize="medium" />,
};

const MenuDrawer: FC<MenuDrawerProps> = ({ toggleDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await getAllCategories();

        if (response?.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error(error);

        openSnackbar(`${error}`, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [openSnackbar]);

  return (
    <Box className="h-full w-full flex flex-col p-2">
      <Box className="w-full flex flex-row justify-between items-center">
        <Typography variant="h6" p={2}>
          Kategoriler
        </Typography>
        <IconButton
          aria-label="exit"
          edge="start"
          color="inherit"
          onClick={() => toggleDrawer(false, "menu", "left")}
        >
          <ClearIcon color="inherit" fontSize="medium" />
        </IconButton>
      </Box>
      <Divider />

      <List className="h-full w-full">
        {loading ? (
          <Box className="h-full flex justify-center items-center">
            <Typography variant="body2">Loading...</Typography>
          </Box>
        ) : (
          categories.map((category, index) => (
            <ListItem
              key={index}
              onClick={() => {
                toggleDrawer(false, "menu", "left"),
                  navigate(`/category/${category._id}`);
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{categoryIcons[category.name]}</ListItemIcon>
                <ListItemText primary={category.name} />
                <ListItemIcon>
                  <ChevronRightIcon fontSize="medium" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default MenuDrawer;
