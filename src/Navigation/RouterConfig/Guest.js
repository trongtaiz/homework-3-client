import { lazy } from "react";
import { RouterURL } from "Utils/constants";

export const GuestConfig = [
	{
		component: lazy(() => import("Pages/JoinClass")),
		path: RouterURL.JOIN_BY_EMAIL,
	},
	{
		component: lazy(() => import("Pages/ResetPassword")),
		path: RouterURL.RESET_PASSWORD,
	},
	{
		component: lazy(() => import("Pages/ActivateAccount")),
		path: RouterURL.VERIFY_EMAIL,
	},
];
