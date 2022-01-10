import {
	RELOGIN,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	UPDATE_USER,
} from "Redux/actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = { user, isLoginRequired: false };

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case RELOGIN:
			return { ...state, user: null, isLoginRequired: true };
		case LOGIN_SUCCESS:
			return { ...state, user: payload.user, isLoginRequired: false };
		case LOGOUT_SUCCESS:
			return { ...state, user: null, isLoginRequired: true };
		case UPDATE_USER:
			return { ...state, user: payload.user };
		default:
			return state;
	}
};

export default authReducer;
