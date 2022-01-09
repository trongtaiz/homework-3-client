import { lazy } from "react";
import { SubClassDetail } from "Utils/constants";

export const ClassPageConfig = [
	{
		component: lazy(() => import("Components/ClassDetail/Stream")),
		path: `/classes/:id/${SubClassDetail.STREAM}`,
	},
	{
		component: lazy(() => import("Components/ClassDetail/People")),
		path: `/classes/:id/${SubClassDetail.PEOPLE}`,
	},
	{
		component: lazy(() => import("Components/ClassDetail/Assignments")),
		path: `/classes/:id/${SubClassDetail.CLASSWORK}`,
	},
	{
		component: lazy(() => import("Pages/Class/Components/GradeManagement")),
		path: `/classes/:id/${SubClassDetail.GRADE}`,
	},
	{
		component: lazy(() => import("Pages/Class/Components/Review")),
		path: `/classes/:id/${SubClassDetail.REVIEW}`,
	},
];
