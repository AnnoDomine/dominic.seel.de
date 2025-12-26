import { createTheme, ThemeProvider } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { Buffer } from "buffer";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./app/app";
import store from "./redux/store";

globalThis.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

export const themeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#22de83",
        },
        background: {
            default: "#e2e2e2",
            paper: "#efefef",
        },
    },
    typography: {
        fontFamily: "Fira Code",
    },
    spacing: 8,
    direction: "rtl",
    shape: {
        borderRadius: 4,
    },
};

export const theme = createTheme(themeOptions);

root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>
);
