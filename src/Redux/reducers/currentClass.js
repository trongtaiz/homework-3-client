import {
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
	GET_CLASS_DETAIL,
	GET_ROLE,
	GET_ASSIGNMENTS,
} from "Redux/actions/types";

const initialState = {
	students: [],
	teachers: [],
	class: {},
	role: "",
	assignments: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_TEACHER_IN_CLASS:
			return {
				...state,
				teachers: [...payload],
			};
		case GET_STUDENT_IN_CLASS:
			return {
				...state,
				students: [...payload],
			};
		case GET_CLASS_DETAIL:
			return {
				...state,
				class: payload,
			};
		case GET_ROLE:
			return {
				...state,
				role: payload,
			};
		case GET_ASSIGNMENTS:
			return {
				...state,
				assignments: [...payload],
			};
		default:
			return state;
	}
}
