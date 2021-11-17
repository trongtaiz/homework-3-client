import axios from "axios";
import { authRequest } from "Utils/request";
import "dotenv/config";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_SERVER_URL;
// const baseURL = "https://midterm-classroom.herokuapp.com";

export const getAllClass = async () => {
	return authRequest.get(`${baseURL}/classes/all`);
};

export const fetchStudentId = async (classId, userId) => {
	return authRequest.get(`${baseURL}/classes/fetchStudentId`, {
		params: { classId: classId, userId: userId },
	});
};

export const changeStudentId = async (classId, userId, studentId) => {
	return authRequest.get(`${baseURL}/classes/changeStudentId`, {
		params: { classId: classId, userId: userId, studentId: studentId },
	});
};

export const getClassDetail = async (id) => {
	return authRequest.get(`${baseURL}/classes/${id}`);
};

export const createClass = async (data) => {
	return authRequest.post(`${baseURL}/classes`, data);
};

export const getStudentsInClass = async (id) => {
	return authRequest.get(`${baseURL}/classes/students/${id}`);
};

export const getTeachersInClass = async (id) => {
	return authRequest.get(`${baseURL}/classes/teachers/${id}`);
};

export const getRole = async (classId, userId) => {
	return authRequest.get(`${baseURL}/classes/role`, {
		params: { classId: classId, userId: userId },
	});
};

export const joinClass = async (data) => {
	const { classId, inviteId } = data;
	return authRequest.get(
		`/classes/join-class?classId=${classId}&inviteId=${inviteId}`
	);
};

export const joinByEmail = async (token) => {
	return axios.get(`${baseURL}/classes/join-by-email/${token}`);
};

export const inviteEmail = async (data) => {
	return authRequest.post(`/classes/send-email`, data);
};
