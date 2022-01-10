import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
// import { useSelector } from "react-redux";

// import { RouterURL } from "Utils/constants";

import CircularProgress from "@mui/material/CircularProgress";

import * as Styled from "./GuestRoute.styled";

const propTypes = {
	path: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
		.isRequired,
};

const defaultProps = {
	exact: false,
};

function GuestRoute({ path, exact, component: Component }) {
	// const user = useSelector((state) => state.user);

	// useEffect(() => {
	// 	console.log(user);
	// }, [user]);

	return (
		<Route path={path} exact={exact}>
			{/* {user ? (
				<Redirect replace to={RouterURL.HOME} />
			) : ( */}
			<Suspense
				fallback={
					<Styled.LoadingContainer>
						<CircularProgress />
					</Styled.LoadingContainer>
				}
			>
				<Component />
			</Suspense>
			{/* )} */}
		</Route>
	);
}

GuestRoute.propTypes = propTypes;
GuestRoute.defaultProps = defaultProps;

export default GuestRoute;
