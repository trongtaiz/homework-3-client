import axios from "axios";
import { reLogin } from "Redux/actions/auth";
import store from "Redux/store";
import "dotenv/config";

const API_URL = "http://localhost:4300";
// const API_URL = "https://final-classroom.herokuapp.com";
// const API_URL = "http://localhost:4300";

const request = axios.create({
	baseURL: API_URL,
});

const authRequest = axios.create({
	baseURL: API_URL,
});

const adminRequest = axios.create({
	baseURL: API_URL,
});

// Interceptor for authRequest
authRequest.interceptors.request.use(
	async (config) => {
		// const accessToken = localStorage.getItem("accessToken");
		// if (accessToken) {
		// 	config.headers["Authorization"] = "Bearer " + accessToken;
		// }
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

// Interceptor for Response
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

authRequest.interceptors.response.use(
	(response) => {
		return response;
	},
	async (err) => {
		const originalRequest = err.config;

		if (
			err.response.status === 401 &&
			!originalRequest._retry &&
			originalRequest.url !== "/auth/refresh-token"
		) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
					console.log(failedQueue);
				})
					.then((token) => {
						originalRequest.headers["Authorization"] =
							"Bearer " + token;
						return authRequest(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			return new Promise(function (resolve, reject) {
				const refreshToken = localStorage.getItem("refreshToken");

				authRequest
					.post("/auth/refresh-token", {
						refreshToken,
					})
					.then(({ data }) => {
						const accessToken = data.data;
						authRequest.defaults.headers.common["Authorization"] =
							"Bearer " + accessToken;
						originalRequest.headers["Authorization"] =
							"Bearer " + accessToken;
						processQueue(null, accessToken);
						resolve(authRequest(originalRequest));
					})
					.catch((err) => {
						localStorage.removeItem("refreshToken");
						store.dispatch(reLogin());
						processQueue(err, null);
						reject(err);
					})
					.then(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(err);
	}
);

export { request, authRequest, adminRequest };
