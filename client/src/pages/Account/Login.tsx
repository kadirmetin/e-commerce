import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "../../context/ToastContext";
useSnackbar;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({
    error: false,
    desc: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    desc: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const { setTokenandUser } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { openSnackbar } = useSnackbar();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsDisable(true);

      setEmailError({ error: false, desc: "" });
      setPasswordError({ error: false, desc: "" });

      let errors: { field: string; desc: string }[] = [];

      if (!email) {
        errors.push({ field: "email", desc: "E-posta alanı boş bırakılamaz." });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({
          field: "email",
          desc: "Geçersiz e-posta formatı. Lütfen geçerli bir e-posta adresi girin.",
        });
      }

      if (!password) {
        errors.push({
          field: "password",
          desc: "Şifre alanı boş bırakılamaz.",
        });
      } else if (password.length < 8) {
        errors.push({
          field: "password",
          desc: `Şifre en az ${8} karakter uzunluğunda olmalıdır.`,
        });
      }

      if (errors.length > 0) {
        errors.forEach((error) => {
          switch (error.field) {
            case "email":
              setEmailError({ error: true, desc: error.desc });
              break;
            case "password":
              setPasswordError({ error: true, desc: error.desc });
              break;

            default:
              break;
          }
        });

        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        openSnackbar(response.data.message, "success");
        setTokenandUser(response.data.token, response.data.user);

        setTimeout(() => {
          navigate("/", { replace: true });

          setIsDisable(false);
        }, 3000);
      } else {
        openSnackbar(response.data.message, "error");
      }
    } catch (error) {
      console.error("An error occurred:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        openSnackbar(error.response.data.message, "error");
      } else {
        openSnackbar(`Bir hata oluştu: ${(error as Error).message}`, "error");
      }
    } finally {
      setIsDisable(false);
    }
  };

  return (
    <Box className="bg-[#d9d9d9] h-full w-full py-5 shadow-md md:h-3/5 md:w-1/2 md:rounded-md">
      <Box className="h-full flex flex-col justify-between items-center">
        <Typography
          variant="h5"
          fontWeight={"semibold"}
          letterSpacing={5}
          textAlign={"center"}
        >
          SMA SHOP
        </Typography>

        <Typography variant="h6" textAlign={"center"}>
          Giriş Yap
        </Typography>

        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center w-full"
        >
          <Box className="mt-3 w-1/2">
            <FormControl className="gap-5 w-full">
              <TextField
                label="E-Posta Adresi"
                disabled={isDisable}
                error={emailError.error}
                helperText={emailError.desc}
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Şifre"
                disabled={isDisable}
                error={passwordError.error}
                helperText={passwordError.desc}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        disabled={isDisable ? true : false}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box className="mt-3 w-1/2">
            <Button
              disabled={isDisable ? true : false}
              className="h-12"
              variant="outlined"
              fullWidth
              type="submit"
            >
              Giriş Yap
            </Button>
          </Box>
        </form>

        <Box className="flex flex-col justify-center items-center">
          <Typography variant="overline">Hesabınız yok mu?</Typography>
          <Link href="/account/register" underline="hover">
            <Typography
              textAlign={"center"}
              variant="overline"
              color={"blue"}
              fontWeight={400}
            >
              Üye ol
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
