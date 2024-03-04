import { Snackbar } from "@mui/material";
import Alert, { AlertColor } from "@mui/material/Alert";
import { ReactNode, createContext, useContext, useState } from "react";

interface SnackbarContextProps {
  openSnackbar: (message: string, severity: AlertColor) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>();

  const openSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setAlertSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);

    setTimeout(() => {
      setSnackbarMessage("");
    }, 1000);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      <>
        {children}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
