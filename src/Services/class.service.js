import axios from "axios";

const baseURL = "http://localhost:4300";

export const getAllClass = async () => {
  return axios.get(`${baseURL}/classes/all`);
};

export const createClass = async (data) => {
  return axios.post(`${baseURL}/classes`, data);
};
