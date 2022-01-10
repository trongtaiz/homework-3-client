import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Route, Switch } from "react-router";

import ClassHeader from "Components/ClassDetail/ClassHeader";
import CircularProgress from "@mui/material/CircularProgress";

import { SubClassDetail } from "Utils/constants";
import { ClassPageConfig } from "./ClassConfig";

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

function RenderClass({ path, exact, component: Component }) {
	const { classId } = useParams();
	return (
		<Route path={path} exact={exact}>
			<Suspense fallback={<CircularProgress />}>
				<Component id={classId} />
			</Suspense>
		</Route>
	);
}

function ClassDetail() {
	const { subNav } = useParams();
	// eslint-disable-next-line no-undef
	const tabIndex = Object.values(SubClassDetail).indexOf(subNav);

	return (
		<>
			<ClassHeader hasNav={true} navTag={tabIndex} />
			<Switch>{renderRoutes(ClassPageConfig, RenderClass)}</Switch>
		</>
	);
}

export default ClassDetail;
