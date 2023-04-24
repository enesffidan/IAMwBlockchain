import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#528CFC",
      contrastText: "#000", //button text black instead of white
    },
    secondary: {
      main: '#528CFC',
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
