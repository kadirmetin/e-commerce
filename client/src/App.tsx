import { ThemeProvider, createTheme } from "@mui/material/styles";
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
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RoutesList />
    </ThemeProvider>
  );
};

export default App;
