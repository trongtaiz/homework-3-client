import { combineReducers } from "redux";

import classReducer from "Redux/reducers/classes";
import postReducer from "Redux/reducers/posts";

const allReducers = combineReducers({
	classes: classReducer,
	posts: postReducer,
});

export default allReducers;
