import {
	SET_CLASS,
	ADD_CLASS,
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
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
