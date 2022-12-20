import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#46AD8D",
      contrastText: "#000", //button text black instead of white
    },
    secondary: {
      main: colors.green[100],
    },
    background: {
      default: "#E3F3FA",
    },
  },
});

export default theme;
