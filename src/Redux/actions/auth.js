import { LOGIN_SUCCESS, RELOGIN, LOGOUT_SUCCESS } from "./types";

export const reLogin = () => ({
	type: RELOGIN,
});

export const login = (payload) => ({
	type: LOGIN_SUCCESS,
	payload,
});

export const logout = () => ({
	type: LOGOUT_SUCCESS,
});
