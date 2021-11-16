import {
	SET_CLASS,
	ADD_CLASS,
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
	CHANGE_ID,
	FETCH_ID,
	GET_CLASS_DETAIL,
} from "./types";

import * as classService from "Services/class.service";

export const fetchAndSetClass = () => async (dispatch) => {
	try {
		const { data } = await classService.getAllClass();
		dispatch({
			type: SET_CLASS,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};

export const getClassDetail = (id) => async (dispatch) => {
	try {
		const { data } = await classService.getClassDetail(id);
		dispatch({
			type: GET_CLASS_DETAIL,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};

export const addClass = (classData) => async (dispatch) => {
	try {
		const { data } = await classService.createClass(classData);
		dispatch({
			type: ADD_CLASS,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};

export const getStudentsInClass = (id) => async (dispatch) => {
	try {
		const { data } = await classService.getStudentsInClass(id);
		console.log("data", data);
		dispatch({
			type: GET_STUDENT_IN_CLASS,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};

export const getTeachersInClass = (id) => async (dispatch) => {
	try {
		const { data } = await classService.getTeachersInClass(id);
		dispatch({
			type: GET_TEACHER_IN_CLASS,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};
export const fetchStudentId = (classId, userId) => async (dispatch) => {
	try {
		const { data } = await classService.fetchStudentId(classId, userId);
		dispatch({
			type: FETCH_ID,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};

export const changeStudentId =
	(classId, userId, studentId) => async (dispatch) => {
		try {
			const { data } = await classService.changeStudentId(
				classId,
				userId,
				studentId
			);
			dispatch({
				type: CHANGE_ID,
				payload: data.data,
			});
		} catch (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
		}
	};
