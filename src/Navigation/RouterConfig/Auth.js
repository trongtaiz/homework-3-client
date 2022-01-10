import { lazy } from "react";
import { RouterURL } from "Utils/constants";

export const AuthConfig = [
	{
		component: lazy(() => import("Pages/Profile")),
		path: RouterURL.PROFILE,
	},
	{
		component: lazy(() => import("Pages/AdminDashboard")),
		path: RouterURL.ADMIN_DASHBOARD,
	},
];
