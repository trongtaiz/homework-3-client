import { authRequest } from "Utils/request";

export const createReview = async (data) => {
	return authRequest.post(`/reviews`, data);
};

export const postComment = async (data) => {
	return authRequest.post(`/reviews/comments`, data);
};

export const getAllCommentsOfReview = async (reviewId) => {
	return authRequest.get(`/reviews/comments`, {
		params: { reviewId: reviewId },
	});
};

export const getAllReviewInClassOfStudent = async (studentId, classId) => {
	return authRequest.get(`/reviews/student/all`, {
		params: { studentId: studentId, classId: classId },
	});
};
