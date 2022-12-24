import { ThemeProvider } from "@mui/material";
import "./App.css";
import RoutesComp from "./router";
import globalTheme from "./globalTheme";

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <div className="App">
        <RoutesComp />
      </div>
    </ThemeProvider>
  );
}

export default App;
