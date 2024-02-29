import "@fontsource-variable/comfortaa";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthProvider from "./context/AuthContext";
import { SnackbarProvider } from "./context/ToastContext";
import RoutesList from "./routes";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Comfortaa Variable",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SnackbarProvider>
          <RoutesList />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
