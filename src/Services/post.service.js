import { authRequest } from "Utils/request";
import "dotenv/config";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_SERVER_URL;

export const getAllPostsInClass = async (id) => {
	return authRequest.get(`/posts/all/${id}`);
};
