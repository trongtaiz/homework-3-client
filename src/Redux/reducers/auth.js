import { RELOGIN, LOGIN_SUCCESS } from "Redux/actions/types";

const initialState = { user: null };

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case RELOGIN:
			return { user: null };
		case LOGIN_SUCCESS:
			return { ...state, user: payload.user };
		default:
			return state;
	}
};

export default authReducer;
