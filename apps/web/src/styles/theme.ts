import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#176c53", dark: "#104d3d", light: "#e4f1e9" },
    secondary: { main: "#d4743e" },
    background: { default: "#f4f6f2", paper: "#ffffff" },
    text: { primary: "#17241f", secondary: "#6b7771" },
    divider: "#e1e7e1",
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.5rem", fontWeight: 700 },
    h3: { fontSize: "1.125rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 7, boxShadow: "none" } },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
  },
});
