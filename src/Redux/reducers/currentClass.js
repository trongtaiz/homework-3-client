import {
	GET_TEACHER_IN_CLASS,
	GET_STUDENT_IN_CLASS,
	GET_CLASS_DETAIL,
	GET_ROLE,
	GET_ASSIGNMENTS,
	GET_NOTIFICATIONS,
	UPDATE_NOTIFICATION,
} from "Redux/actions/types";

const initialState = {
	students: [],
	teachers: [],
	class: {},
	role: "",
	assignments: [],
	notifications: [],
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
		case GET_NOTIFICATIONS:
			return {
				...state,
				notifications: [...payload],
			};
		case UPDATE_NOTIFICATION:
			state.notifications.find((i) => i.id === payload.id).seen =
				payload.seen;
			return {
				...state,
				//notifications: [...payload],
			};
		default:
			return state;
	}
}
