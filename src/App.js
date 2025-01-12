import { ThemeProvider } from "styled-components";
import Router from "./shared/Router.jsx"
import { theme } from "./style/theme.jsx";
import { GlobalStyle } from "./style/GlobalStyle.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
