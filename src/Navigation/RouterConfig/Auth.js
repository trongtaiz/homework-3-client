import { lazy } from "react";
import { RouterURL } from "Utils/constants";

export const AuthConfig = [
	{
		component: lazy(() => import("Pages/JoinClass")),
		path: RouterURL.JOIN_CLASS,
	},
	{
		component: lazy(() => import("Pages/Home")),
		path: RouterURL.CLASS_DETAIL,
	},
];
