import { combineReducers } from "redux";

import classReducer from "Redux/reducers/classes";
import authReducer from "./auth";

const allReducers = combineReducers({
	classes: classReducer,
	auth: authReducer,
});

export default allReducers;
