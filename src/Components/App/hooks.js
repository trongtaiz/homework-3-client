import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "Redux/actions/auth";
import { authRequest } from "Utils/request";

export const useUserAuth = () => {
	const dispatch = useDispatch();
	const isLoginRequired = useSelector((state) => state.auth.isLoginRequired);
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

	if (!isLoginRequired && refreshToken) {
		fetchUserInfo();
	}
};
