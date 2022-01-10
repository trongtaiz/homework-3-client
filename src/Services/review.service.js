import { authRequest } from "Utils/request";

export const createReview = async (data) => {
	return authRequest.post(`/reviews`, data);
};

export const getReviewDetail = async (reviewId) => {
	return authRequest.get(`/reviews`, {
		params: { reviewId: reviewId },
	});
};

export const postComment = async (data) => {
	return authRequest.post(`/reviews/comments`, data);
};

export const getAllCommentsOfReview = async (reviewId) => {
	return authRequest.get(`/reviews/comments`, {
		params: { reviewId: reviewId },
	});
};

export const getAllReviewInClass = async (classId) => {
	return authRequest.get(`/reviews/class`, {
		params: { classId: classId },
	});
};

export const getAllReviewOfAssignment = async (assignmentId) => {
	return authRequest.get(`/reviews/assignment`, {
		params: { assignmentId: assignmentId },
	});
};

export const getAllReviewInClassOfStudent = async (studentId, classId) => {
	return authRequest.get(`/reviews/student/all`, {
		params: { studentId: studentId, classId: classId },
	});
};

export const finalizeReview = async (reviewId, finalGrade) => {
	return authRequest.post(`/reviews/finalize`, { reviewId, finalGrade });
};
