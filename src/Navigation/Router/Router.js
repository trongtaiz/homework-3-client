import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { RouterURL } from "Utils/constants";
import AppLayout from "Layouts/AppLayout";
import Home from "Pages/Home";

import {
	AuthConfig,
	GuestConfig,
	NeutralConfig,
} from "Navigation/RouterConfig";
import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";
import NeutralRoute from "./NeutralRoute";
import ClassDetail from "Pages/Class/ClassDetail";
import ReviewDetail from "Pages/Class/ReviewDetail";
import MockSocket from "Components/Notification/Socket";

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
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<MockSocket userId={user?.id}></MockSocket>

			<Switch>
				{renderRoutes(AuthConfig, AuthRoute)}
				{renderRoutes(GuestConfig, GuestRoute)}
				{renderRoutes(NeutralConfig, NeutralRoute)}
				<Route path={RouterURL.HOME} exact>
					<AppLayout>
						<Home />
					</AppLayout>
				</Route>
				<Route
					path="/classes/:classId/review-detail/:reviewId"
					component={ReviewDetail}
				/>
				<Route
					path="/classes/:classId/:subNav"
					component={ClassDetail}
				/>
			</Switch>
		</>
	);
}

export default AppRouter;
