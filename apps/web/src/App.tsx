import { CssBaseline, ThemeProvider, type Theme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastProvider } from "./components/ToastProvider";

export function App({ theme }: { theme: Theme }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  );
}
