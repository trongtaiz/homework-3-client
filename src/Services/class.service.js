import axios from "axios";
import "dotenv/config";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_SERVER_URL;
const baseURL = "http://localhost:4300";

export const getAllClass = async () => {
	return axios.get(`${baseURL}/classes/all`);
};

export const getClassDetail = async (id) => {
	return axios.get(`${baseURL}/classes/${id}`);
};

export const createClass = async (data) => {
	return axios.post(`${baseURL}/classes`, data);
};
