import { authRequest, request } from "Utils/request";
import "dotenv/config";

// eslint-disable-next-line no-undef

export const getAllClass = async () => {
	return authRequest.get(`/classes/all`);
};

export const fetchStudentId = async (classId, userId) => {
	return authRequest.get(`/classes/fetchStudentId`, {
		params: { classId: classId, userId: userId },
	});
};

export const changeStudentId = async (classId, userId, studentId) => {
	return authRequest.get(`/classes/changeStudentId`, {
		params: { classId: classId, userId: userId, studentId: studentId },
	});
};

export const getClassDetail = async (id) => {
	return authRequest.get(`/classes/${id}`);
};

export const createClass = async (data) => {
	return authRequest.post(`/classes`, data);
};

export const getStudentsInClass = async (id) => {
	return authRequest.get(`/classes/students/${id}`);
};

export const getTeachersInClass = async (id) => {
	return authRequest.get(`/classes/teachers/${id}`);
};

export const getRole = async (classId, userId) => {
	return authRequest.get(`/classes/role`, {
		params: { classId: classId, userId: userId },
	});
};

export const joinClass = async (data) => {
	const { classId, inviteId } = data;
	return authRequest.get(`/classes/join-class`, {
		params: { classId, inviteId },
	});
};

export const joinByCode = async (code) => {
	return authRequest.get(`/classes/join-by-code`, {
		params: { code },
	});
};

export const joinByEmail = async (token) => {
	return request.get(`/classes/join-by-email/${token}`);
};

export const inviteEmail = async (data) => {
	return authRequest.post(`/classes/send-email`, data);
};

export const uploadStudentList = async (data) => {
	return authRequest.post(`/classes/students/upload`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const uploadGradeBoard = async (data) => {
	return authRequest.post(`/assignments/points/upload`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};

export const getPointsTable = async (data) => {
	const { classId } = data;
	return authRequest.get(`/classes/assignments/all/points`, {
		params: { classId },
	});
};

export const updateNotification = async (id, seen) => {
	return authRequest.patch(`/notifications`, {
		id: id,
		seen: seen,
	});
};

export const getAllNotificationsInClass = async (classId, receiverId) => {
	return authRequest.get(`/notifications/all-in-class`, {
		params: { classId: classId, receiverId: receiverId },
	});
};

export const getAllPointOfAStudent = async (studentId, classId) => {
	return authRequest.get(`/classes/student/points`, {
		params: {
			studentId: studentId,
			classId: classId,
		},
	});
};
