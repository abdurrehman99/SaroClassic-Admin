import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        body1: "p",
        body2: "p",
      },
    },
  },
  spacing: 0,
  palette: {
    primary: { main: "#082E52" },
    secondary: { main: "#7a7a7a" },
  },
  typography: {
    fontFamily: "Montserrat",
    color: "black",
    fontSize: 14,
  },
  shape: {
    // borderRadius: 25,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
