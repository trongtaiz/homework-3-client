import { lazy } from "react";
import { RouterURL } from "Utils/constants";

export const AuthConfig = [
	{
		component: lazy(() => import("Pages/Home")),
		path: RouterURL.CLASS,
	},
];
