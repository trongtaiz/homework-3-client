import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "Components/App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import allReducers from "Redux/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(
	allReducers,
	composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
	<Provider store={store}>
		<React.Fragment>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<App />
		</React.Fragment>
	</Provider>,
	// eslint-disable-next-line no-undef
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
