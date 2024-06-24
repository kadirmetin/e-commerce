import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

type Props = {};

const ProductAddIndex = (props: Props) => {
  return (
    <Container maxWidth="xl" className="pt-8 gap-4">
      <Box className="flex flex-row justify-between items-center">
        <Typography variant="h5">Ürün Ekle</Typography>
        <Button variant="contained" startIcon={<Save />} onClick={() => {}}>
          Kaydet
        </Button>
      </Box>

      <Box className="mt-4 p-4 rounded-md bg-gray-100">
        <form autoComplete="off" noValidate className="flex flex-col w-full">
          <FormControl className="w-full gap-4">
            <Box className="w-full flex flex-row gap-4">
              <TextField
                label="Ürün adı"
                required
                fullWidth
                className="w-3/4"
              />
              <TextField
                id="filled-select-currency"
                select
                label="Kategori"
                variant="outlined"
                className="w-1/4"
              >
                <MenuItem key={1} value={"test"}>
                  TEST
                </MenuItem>
                <MenuItem key={2} value={"test"}>
                  TEST
                </MenuItem>
                <MenuItem key={3} value={"test"}>
                  TEST
                </MenuItem>
              </TextField>
            </Box>
            <Box className="w-full flex flex-row gap-4">
              <TextField label="Marka" required fullWidth className="w-2/4" />
              <TextField label="Fiyat" required fullWidth className="w-2/4" />
            </Box>
            <Box className="w-full flex">
              <TextField
                label="Açıklama"
                multiline
                rows={5}
                fullWidth
                required
              />
            </Box>

            <Box className="w-full h-80 flex flex-col border-2 rounded-xl border-dashed"></Box>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default ProductAddIndex;
