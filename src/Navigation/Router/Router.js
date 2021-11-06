import React from "react";
import { Switch, Route } from "react-router-dom";

import { AuthConfig } from "Navigation/RouterConfig";
// import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";

const renderRoutes = (routes, RouteWrapper) =>
	routes.map(({ path, title, component, exact = true, ...props }) => (
		<RouteWrapper
			key={path}
			title={title}
			path={path}
			exact={exact}
			component={component}
			{...props}
		/>
	));

function AppRouter() {
	return (
		<>
			<Switch>
				{renderRoutes(AuthConfig, AuthRoute)}
				{/* {renderRoutes(GuestConfig, GuestRoute)} */}
				<Route path="*">
					<div>404</div>
				</Route>
			</Switch>
		</>
	);
}

export default AppRouter;
