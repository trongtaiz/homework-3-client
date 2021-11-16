import React from "react";
import { Switch, Route } from "react-router-dom";

import { RouterURL } from "Utils/constants";
import AppLayout from "Layouts/AppLayout";
import Home from "Pages/Home";

import { AuthConfig } from "Navigation/RouterConfig";
// import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";
import ClassDetail from "Pages/Class/ClassDetail";

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
				<Route path={RouterURL.HOME} exact>
					<AppLayout>
						<Home />
					</AppLayout>
				</Route>
				<Route path="/classes/:id/:subNav" component={ClassDetail} />
			</Switch>
		</>
	);
}

export default AppRouter;
