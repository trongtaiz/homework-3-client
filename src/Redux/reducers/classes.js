import { SET_CLASS, ADD_CLASS, LOGOUT_SUCCESS } from "Redux/actions/types";

const initialState = { classes: [] };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_CLASS:
			return { classes: [...payload] };
		case ADD_CLASS:
			return { classes: [...state.classes, payload] };
		case LOGOUT_SUCCESS:
			return { classes: [] };
		default:
			return state;
	}
}
