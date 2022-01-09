import { request, authRequest } from "Utils/request";
import "dotenv/config";

export const signIn = async ({ email, password }) => {
	return request.post(`/admins/sign-in`, { email, password });
};

export const getAllUser = async () => {
	return authRequest.get("/admins/users/all");
};

export const getAllClass = async () => {
	return authRequest.get("/admins/classes/all");
};

export const getAllAdmin = async () => {
	return authRequest.get("/admins/all");
};

export const lockUser = async ({ userId, isLocked }) => {
	return authRequest.post("/admins/users/lock", { userId, isLocked });
};

export const mapStudentId = async ({ userId, studentId }) => {
	return authRequest.post("/admins/users/map-student-id", {
		userId,
		studentId,
	});
};

export const createAdmin = async ({ email, password, name }) => {
	return authRequest.post("/admins/new", {
		email,
		password,
		name,
	});
};
