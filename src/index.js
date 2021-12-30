import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
	crossorigin="anonymous"
></script>;

const themeLight = createMuiTheme({
	palette: {
		background: {
			default: "#e4f0e2",
		},
	},
});

const themeDark = createMuiTheme({
	palette: {
		background: {
			default: "#222222",
		},
		text: {
			primary: "#ffffff",
		},
	},
});

const App1 = () => {
	const [light, setLight] = React.useState(true);
	return (
		<MuiThemeProvider theme={light ? themeLight : themeDark}>
			<CssBaseline />
			<Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>
			<App></App>
		</MuiThemeProvider>
	);
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App1 />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
