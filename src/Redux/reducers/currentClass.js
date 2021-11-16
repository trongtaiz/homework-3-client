import {
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
} from "Redux/actions/types";

const initialState = { students: [], teachers: [] };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_TEACHER_IN_CLASS:
			return {
				students: [...state.students],
				teachers: [...payload],
			};
		case GET_STUDENT_IN_CLASS:
			return {
				teachers: [...state.teachers],
				students: [...payload],
			};
		default:
			return state;
	}
}
