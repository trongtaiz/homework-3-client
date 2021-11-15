import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRouter from "Navigation/Router";
import { useUserAuth } from "./hooks";

function App() {
	useUserAuth();

	return (
		<div className="App">
			<Router>
				<AppRouter />
			</Router>
		</div>
	);
}

export default App;
