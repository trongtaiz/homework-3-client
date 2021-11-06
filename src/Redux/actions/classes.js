import { SET_CLASS, ADD_CLASS } from "./types";

import * as classService from "Services/class.service";

export const fetchAndSetClass = () => async (dispatch) => {
	try {
		const { data } = await classService.getAllClass();
		dispatch({
			type: SET_CLASS,
			payload: data,
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
			payload: data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};
