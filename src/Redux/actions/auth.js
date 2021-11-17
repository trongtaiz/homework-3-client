import { LOGIN_SUCCESS, RELOGIN, LOGOUT_SUCCESS, UPDATE_USER } from "./types";

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

export const updateUser = (payload) => ({
	type: UPDATE_USER,
	payload,
});
