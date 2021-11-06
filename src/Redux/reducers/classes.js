import { SET_CLASS, ADD_CLASS } from "Redux/actions/types";

const initialState = { classes: [] };

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_CLASS:
			return { classes: [...payload] };
		case ADD_CLASS:
			return { classes: [...state.classes, payload] };
		default:
			return state;
	}
}
