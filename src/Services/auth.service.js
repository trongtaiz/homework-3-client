import { request } from "Utils/request";
import "dotenv/config";

export const activateAccount = async ({ token }) => {
	return request.post(`/auth/verify-email`, { token });
};

export const forgetPassword = async ({ email }) => {
	return request.post(`/auth/forgot-password`, { email });
};

export const resetPassword = async ({ token, newPassword }) => {
	return request.post(`/auth/reset-password`, { token, newPassword });
};
