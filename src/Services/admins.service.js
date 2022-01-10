import { request, adminRequest } from "Utils/request";
import "dotenv/config";

export const signIn = async ({ email, password }) => {
	return request.post(`/admins/sign-in`, { email, password });
};

export const getAllUser = async () => {
	return adminRequest.get("/admins/users/all");
};

export const getAllClass = async () => {
	return adminRequest.get("/admins/classes/all");
};

export const getAllAdmin = async () => {
	return adminRequest.get("/admins/all");
};

export const lockUser = async ({ userId, isLocked }) => {
	return adminRequest.post("/admins/users/lock", { userId, isLocked });
};

export const mapStudentId = async ({ userId, studentId }) => {
	return adminRequest.post("/admins/users/map-student-id", {
		userId,
		studentId,
	});
};

export const createAdmin = async ({ email, password, name }) => {
	return adminRequest.post("/admins/new", {
		email,
		password,
		name,
	});
};

export const getUserClasses = async ({ userId }) => {
	return adminRequest.get("/admins/user/classes", {
		params: { userId },
	});
};
