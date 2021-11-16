import {
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
	GET_CLASS_DETAIL,
} from "Redux/actions/types";

const initialState = { students: [], teachers: [], class: {} };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_TEACHER_IN_CLASS:
			return {
				students: [...state.students],
				teachers: [...payload],
				class: state.class,
			};
		case GET_STUDENT_IN_CLASS:
			return {
				teachers: [...state.teachers],
				students: [...payload],
				class: state.class,
			};
		case GET_CLASS_DETAIL:
			return {
				teachers: [...state.teachers],
				students: [...state.students],
				class: payload,
			};
		default:
			return state;
	}
}
