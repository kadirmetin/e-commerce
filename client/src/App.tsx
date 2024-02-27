import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Layout } from "./components";

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
      <Layout>
        <p>Hello World!</p>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
