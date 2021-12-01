import React, { useEffect, Suspense } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";

import ClassHeader from "Components/ClassDetail/ClassHeader";
import CircularProgress from "@mui/material/CircularProgress";

import { getClassDetail, getRole } from "Redux/actions/classes";

import { RouterURL, SubClassDetail } from "Utils/constants";
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
	const { id } = useParams();
	return (
		<Route path={path} exact={exact}>
			<Suspense fallback={<CircularProgress />}>
				<Component id={id} />
			</Suspense>
		</Route>
	);
}

function ClassDetail(props) {
	const { name, role, getClassDetail, getRole, user } = props;
	const { id, subNav } = useParams();
	const history = useHistory();

	// eslint-disable-next-line no-undef
	const refreshToken = localStorage.getItem("refreshToken");
	const tabIndex = Object.values(SubClassDetail).indexOf(subNav);

	useEffect(() => {
		if (!refreshToken) {
			history.push(RouterURL.HOME);
			return;
		}
		getClassDetail(id);
	}, []);

	useEffect(() => {
		getRole(id, user?.id);
	}, [user]);

	return (
		<>
			<ClassHeader navTag={tabIndex} name={name} role={role} />
			<Switch>{renderRoutes(ClassPageConfig, RenderClass)}</Switch>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		name: state.currentClass.class.name,
		role: state.currentClass.role,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { getClassDetail, getRole })(
	ClassDetail
);
