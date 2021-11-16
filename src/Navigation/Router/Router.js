import React from "react";
import { Switch, Route } from "react-router-dom";

import { AuthConfig } from "Navigation/RouterConfig";
// import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";
import ClassDetail from "Pages/Class/ClassDetail";
import MappingAccountIDModel from "Components/ClassDetail/MappingAccountIDModel";

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
				<Route path="/classes/:id/:subNav" component={ClassDetail} />
				<Route path="/" component={MappingAccountIDModel} />
			</Switch>
		</>
	);
}

export default AppRouter;
