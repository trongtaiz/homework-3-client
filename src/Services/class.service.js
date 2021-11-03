import axios from "axios";

const baseURL = "https://homework-3-server.herokuapp.com";

export const getAllClass = async () => {
  return axios.get(`${baseURL}/classes/all`);
};

export const createClass = async (data) => {
  return axios.post(`${baseURL}/classes`, data);
};
