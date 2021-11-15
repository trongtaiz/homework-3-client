import { useDispatch } from "react-redux";
import { login } from "Redux/actions/auth";
import store from "Redux/store";
import { authRequest } from "../../Utils/request";

export const useUserAuth = () => {
	const dispatch = useDispatch();
	const refreshToken = localStorage.getItem("refreshToken");

	const fetchUserInfo = async () => {
		await authRequest
			.get("/users/me")
			.then((response) => {
				const user = response.data.data;
				dispatch(login({ user }));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (refreshToken) {
		fetchUserInfo();
	}
};
