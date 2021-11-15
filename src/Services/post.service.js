import axios from "axios";
import "dotenv/config";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_SERVER_URL;
const baseURL = "http://localhost:4300";

export const getAllPostsInClass = async (id) => {
	return axios.get(`${baseURL}/posts/all/${id}`);
};
