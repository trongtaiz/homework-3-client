import {
	SET_CLASS,
	ADD_CLASS,
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
} from "Redux/actions/types";

const initialState = { classes: [], students: [], teachers: [] };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_CLASS:
			return { classes: [...payload] };
		case ADD_CLASS:
			return { classes: [...state.classes, payload] };
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
