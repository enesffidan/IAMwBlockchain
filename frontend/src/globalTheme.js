import { colors, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#528CFC",
      contrastText: "#000", //button text black instead of white
    },
    secondary: {
      main: colors.green[100],
    },
    background: {
      default: "#E3F3FA",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        },
      },
    },
  },
});

export default theme;
