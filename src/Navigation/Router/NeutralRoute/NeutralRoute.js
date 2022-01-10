/* eslint-disable no-undef */
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";

import CircularProgress from "@mui/material/CircularProgress";

const propTypes = {
	path: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
		.isRequired,
};

const defaultProps = {
	exact: false,
};

function NeutralRoute({ path, exact, component: Component }) {
	return (
		<Route path={path} exact={exact}>
			<Suspense fallback={<CircularProgress />}>
				<Component />
			</Suspense>
		</Route>
	);
}

NeutralRoute.propTypes = propTypes;
NeutralRoute.defaultProps = defaultProps;

export default NeutralRoute;
