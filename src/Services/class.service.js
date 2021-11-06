import axios from "axios";
import "dotenv/config";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const getAllClass = async () => {
	return axios.get(`${baseURL}/classes/all`);
};

export const createClass = async (data) => {
	return axios.post(`${baseURL}/classes`, data);
};
