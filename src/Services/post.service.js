import { authRequest } from "Utils/request";
import "dotenv/config";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_SERVER_URL;
const baseURL = "http://localhost:4300";

export const getAllPostsInClass = async (id) => {
	return authRequest.get(`${baseURL}/posts/all/${id}`);
};
