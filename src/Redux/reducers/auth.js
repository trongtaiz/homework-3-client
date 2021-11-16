import { RELOGIN, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "Redux/actions/types";

const initialState = { user: null, isLoginRequired: false };

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case RELOGIN:
			return { ...state, user: null, isLoginRequired: true };
		case LOGIN_SUCCESS:
			return { ...state, user: payload.user, isLoginRequired: false };
		case LOGOUT_SUCCESS:
			return { ...state, user: null, isLoginRequired: true };
		default:
			return state;
	}
};

export default authReducer;
