import { combineReducers } from "redux";
import classReducer from "Redux/reducers/classes";
import authReducer from "./auth";
import postReducer from "Redux/reducers/posts";
import currentClass from "Redux/reducers/currentClass";

const allReducers = combineReducers({
	classes: classReducer,
	auth: authReducer,
	posts: postReducer,
	currentClass,
});

export default allReducers;
