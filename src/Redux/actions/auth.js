import { LOGIN_SUCCESS, RELOGIN } from "./types";

export const reLogin = () => ({
	type: RELOGIN,
});

export const login = (payload) => ({
	type: LOGIN_SUCCESS,
	payload,
});
