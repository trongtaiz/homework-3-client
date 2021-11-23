import axios from "axios";
const API_URL = "http://localhost:5000/api/form/";

export default {
	updateGradeStructure(data) {
		console.log(data);
		return axios.put(API_URL + "/ /", data).then((response) => {
			console.log(response.data);
			return response.data;
		});
	},
};
