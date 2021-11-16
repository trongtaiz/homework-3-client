import axios from "axios";
import { authRequest } from "Utils/request";
import "dotenv/config";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_SERVER_URL;
const baseURL = "http://localhost:4300";

export const getAllClass = async () => {
	return axios.get(`${baseURL}/classes/all`);
};

export const fetchStudentId = async (classId, userId) => {
	return axios.get(`${baseURL}/classes/fetchStudentId`, {
		params: { classId: classId, userId: userId },
	});
};

export const changeStudentId = async (classId, userId, studentId) => {
	return axios.get(`${baseURL}/classes/changeStudentId`, {
		params: { classId: classId, userId: userId, studentId: studentId },
	});
};

export const getClassDetail = async (id) => {
	return axios.get(`${baseURL}/classes/${id}`);
};

export const createClass = async (data) => {
	return axios.post(`${baseURL}/classes`, data);
};

export const getStudentsInClass = async (id) => {
	return axios.get(`${baseURL}/classes/students/${id}`);
};

export const getTeachersInClass = async (id) => {
	return axios.get(`${baseURL}/classes/teachers/${id}`);
};

export const joinClass = async (data) => {
	const { classId, inviteId } = data;
	return authRequest.get(
		`/classes/join-class?classId=${classId}&inviteId=${inviteId}`
	);
};
