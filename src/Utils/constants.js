export const RouterURL = {
	HOME: "/",
	CLASS: "/class",
	JOIN_CLASS: "/join-class",
	JOIN_BY_EMAIL: "/join-by-email/:token",
	CLASS_DETAIL: "/classes/:id/:nav",
	PROFILE: "/profile",
};

export const RoutableModalUrl = {
	SIGNUP: "/sign-up",
	LOGIN: "/log-in",
	FORGET_PASSWORD: "/forget-password",
};

export const Colors = {
	TRANSPARENT: "Transparent",
	BLUR_TRANSPARENT: "rgba(255,255,255,0.2)",
	AVATAR_BLUR: "rgba(175,175,175, 0.2)",
	DODGER_BLUE: "#3993ff",
	WHITE: "#ffffff",
	GRAY: "#cccccc",
	LIGHT_WHITE: "rgb(242, 246, 250)",
};

export const Role = {
	TEACHER: "TEACHER",
	STUDENT: "STUDENT",
};

export const SubClassDetail = {
	STREAM: "stream",
	PEOPLE: "people",
	GRADE: "grade",
	CLASSWORK: "classwork",
};

export const tabsOnRole = {
	[Role.TEACHER]: [
		{ label: "Stream", to: "stream" },
		{ label: "People", to: "people" },
		{ label: "Grade", to: "grade" },
		{ label: "Classwork", to: "classwork" },
	],
	[Role.STUDENT]: [
		{ label: "Stream", to: "stream" },
		{ label: "People", to: "people" },
		{ label: "Grade", to: "grade" },
	],
};

export const templateStudentList = [
	{ studentId: "18127202", fullName: "Đinh Lê Trọng Tài" },
	{ studentId: "18127226", fullName: "Bùi Thị Anh Thư" },
	{ studentId: "18127072", fullName: "Huỳnh Lâm Hoàng Đại" },
];

export const templateGradeList = [
	{ studentId: "18127202", achievedPoint: 8 },
	{ studentId: "18127226", achievedPoint: 7 },
	{ studentId: "18127072", achievedPoint: 8 },
];
