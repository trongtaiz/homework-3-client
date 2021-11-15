import { combineReducers } from "redux";
import classReducer from "Redux/reducers/classes";
import authReducer from "./auth";
import postReducer from "Redux/reducers/posts";
  
const allReducers = combineReducers({
	classes: classReducer,
	auth: authReducer,
  posts: postReducer,
});

export default allReducers;
