import { useDispatch } from "react-redux";
import { login } from "Redux/actions/auth";
import { authRequest, request } from "../../Utils/request";

export const useSignInOrSignUpModal = () => {
	const dispatch = useDispatch();

	const onLoginSuccess = ({ accessToken, refreshToken, user }) => {
		authRequest.defaults.headers.common["Authorization"] =
			"Bearer " + accessToken;
		localStorage.setItem("refreshToken", refreshToken);

		// const {
		// 	data: { data: user },
		// } = await authRequest.get("/users/me").catch((err) => {
		// 	console.log(err);
		// });

		dispatch(login({ user }));
	};

	const signIn = async ({ email, password }, onSuccess, onFail) => {
		await request
			.post("/auth/sign-in", {
				email,
				password,
			})
			.then(({ data: { data } }) => {
				onLoginSuccess(data);
				onSuccess(data);
			})
			.catch((err) => {
				onFail(err);
			});
	};

	const signUp = async ({ email, password, name }, onSuccess, onFail) => {
		await request
			.post("/auth/sign-up", {
				email,
				password,
				name,
			})
			.then(({ data: { message } }) => {
				onSuccess(message);
			})
			.catch((err) => {
				onFail(err);
			});
	};

	const socialLogin = async (type, token, onSuccess, onFail) => {
		const url = `/auth/${type === "gg" ? "google" : "facebook"}/token`;

		await request
			.get(url, { params: { access_token: token } })
			.then(({ data }) => {
				// console.log(data);
				onLoginSuccess(data);
				onSuccess(data);
			})
			.catch((err) => {
				onFail(err);
			});
	};

	return { signIn, signUp, socialLogin };
};
