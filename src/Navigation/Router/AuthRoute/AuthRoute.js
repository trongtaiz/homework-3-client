import React, { Suspense } from "react";
import { Route, Redirect } from "react-router";
import PropTypes from "prop-types";

import { RouterURL } from "Utils/constants";

import CircularProgress from "@mui/material/CircularProgress";
import AppLayout from "Layouts/AppLayout";
import * as Styled from "./AuthRoute.styled";

const propTypes = {
	path: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
		.isRequired,
};

const defaultProps = {
	exact: false,
};

function AuthRoute({ path, exact, component: Component }) {
	// eslint-disable-next-line no-undef
	const refreshToken = localStorage.getItem("refreshToken");

	return (
		<Route path={path} exact={exact}>
			{!refreshToken ? (
				<Redirect replace to={RouterURL.HOME} />
			) : (
				<Suspense
					fallback={
						<Styled.LoadingContainer>
							<CircularProgress />
						</Styled.LoadingContainer>
					}
				>
					<AppLayout>
						<Component />
					</AppLayout>
				</Suspense>
			)}
		</Route>
	);
}

AuthRoute.propTypes = propTypes;
AuthRoute.defaultProps = defaultProps;

export default AuthRoute;
