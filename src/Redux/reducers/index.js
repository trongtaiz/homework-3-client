import { combineReducers } from "redux";

import classReducer from "Redux/reducers/classes";

const allReducers = combineReducers({
	classes: classReducer,
});

export default allReducers;
