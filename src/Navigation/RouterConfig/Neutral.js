import { lazy } from "react";
import { RouterURL } from "Utils/constants";

export const NeutralConfig = [
	// {
	// 	component: lazy(() => import("Pages/AdminDashboard")),
	// 	path: RouterURL.ADMIN_DASHBOARD,
	// },
	{
		component: lazy(() => import("Pages/JoinClass")),
		path: RouterURL.JOIN_CLASS,
	},
];
