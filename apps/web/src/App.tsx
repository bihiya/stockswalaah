import { CssBaseline, ThemeProvider, type Theme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

export function App({ theme }: { theme: Theme }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
