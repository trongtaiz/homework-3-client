import { FETCH_ID, CHANGE_ID } from "Redux/actions/types";

const initialState = { studentId: null };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_ID:
			if (payload) return { studentId: payload, success: true };
			else return { studentId: state.studentId, success: false };
		case FETCH_ID:
			return { studentId: payload };
		default:
			return state;
	}
}
