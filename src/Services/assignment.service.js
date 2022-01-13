import { authRequest } from "Utils/request";

export const getAssignments = async (id) => {
	return authRequest.get(`/assignments`, {
		params: { classId: id },
	});
};

export const createAssignments = async (data) => {
	return authRequest.post(`/assignments`, data);
};

export const deleteAssignments = async (id) => {
	return authRequest.delete(`/assignments`, { data: { id: id } });
};

export const updateAssignments = async (id, data) => {
	return authRequest.patch(`/assignments`, {
		id: id,
		title: data.title,
		point: data.point,
		order: data.order,
	});
};

export const updateAllAssignments = async (data) => {
	return authRequest.patch(`/assignments/all`, data);
};

export const updateStudentPoints = async ({
	classId,
	assignmentId,
	studentId,
	achievedPoint,
}) => {
	return authRequest.patch(`/assignments/points`, {
		classId,
		assignmentId,
		studentId,
		achievedPoint,
	});
};

export const finalizeAssignments = async (data) => {
	return authRequest.post(`/assignments/finalize`, data);
};
