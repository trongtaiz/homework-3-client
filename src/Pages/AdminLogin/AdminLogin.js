/* eslint-disable no-undef */
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "Redux/actions/auth";

import withCatch from "Utils/withCatch";
import * as Alert from "Utils/alert";
import { authRequest } from "Utils/request";
import { RouterURL } from "Utils/constants";

import { signIn } from "Services/admins.service";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import * as Styled from "./AdminLogin.styled";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.required("Email is require")
		.email("Please enter an valid email!"),
	password: Yup.string().required("Password is require"),
});

function AdminLogin() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { handleSubmit, register, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const onLoginSuccess = ({ accessToken, email }) => {
		authRequest.defaults.headers.common["Authorization"] =
			"Bearer " + accessToken;
		dispatch(login({ user: { role: "admin", email } }));
	};

	const signInFunc = async ({ email, password }) => {
		const [result, error] = await withCatch(signIn({ email, password }));
		if (error) {
			Alert.error("Failed to login");
			return;
		}
		if (result.status === 201) {
			Alert.success("Login success");
			localStorage.setItem(
				"user",
				JSON.stringify({ role: "admin", email })
			);
			onLoginSuccess({ accessToken: result.data.accessToken, email });
			history.push(RouterURL.ADMIN_DASHBOARD);
			return;
		}
	};

	return (
		<Styled.Wrapper>
			<Dialog
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "8px",
					},
				}}
				disableEnforceFocus
				open={true}
				hideBackdrop={true}
			>
				<form onSubmit={handleSubmit(signInFunc)}>
					<DialogTitle>Login to admin dashboard</DialogTitle>
					<DialogContent
						sx={{
							overflowY: "visible",
						}}
					>
						<TextField
							fullWidth
							autoFocus
							variant="outlined"
							type="text"
							margin="dense"
							id="email"
							label="Email (*)"
							error={!!formState.errors.email?.message}
							helperText={formState.errors.email?.message}
							{...register("email")}
						/>
						<TextField
							fullWidth
							variant="outlined"
							type="password"
							margin="dense"
							id="password"
							label="password (*)"
							error={!!formState.errors.password?.message}
							helperText={formState.errors.password?.message}
							{...register("password")}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							disabled={
								!formState.isValid || formState.isSubmitting
							}
							type="submit"
						>
							Login
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Styled.Wrapper>
	);
}

export default AdminLogin;
