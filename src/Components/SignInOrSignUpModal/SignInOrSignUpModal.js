import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useSignInOrSignUpModal } from "./hooks";

const validationSchema = Yup.object().shape({
	username: Yup.string().trim().required("Username is required"),
	password: Yup.string().trim().required("Password is required"),
});

function SignInOrSignUpModal({
	isOpen,
	onClose,
	isSignUpModal,
	setIsSignUpModal,
}) {
	const dispatch = useDispatch();
	const { signIn, signUp, socialLogin } = useSignInOrSignUpModal();
	const [error, setError] = useState("");

	const { handleSubmit, register, reset, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const submit = async (data) => {
		console.log(data);

		if (isSignUpModal) {
			await signUp(
				data,
				(response) => {
					console.log(response);
					closeModal();
				},
				(err) => {
					console.log(err.response);
					const errMessage =
						err.response.status === 409
							? "Username has already existed"
							: "Something wrongs, please try again";
					setError(errMessage);
				}
			);
		} else {
			await signIn(
				data,
				(response) => {
					console.log(response);
					closeModal();
				},
				(err) => {
					console.log(err);
					setError("Invalid username or password");
				}
			);
		}
	};

	const closeModal = () => {
		setError("");
		reset();
		onClose();
	};

	return (
		<div>
			<Dialog
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "8px",
					},
				}}
				open={isOpen}
				onClose={closeModal}
			>
				<form onSubmit={handleSubmit(submit)}>
					<DialogTitle sx={{ textAlign: "center" }}>
						{isSignUpModal ? "Create new account" : "Sign In"}
					</DialogTitle>
					<Typography
						variant="subtitle2"
						display="block"
						sx={{
							textAlign: "center",
							marginTop: "10px",
							marginBottom: "10px",
							color: "red",
						}}
					>
						{error}
					</Typography>

					<DialogContent>
						<TextField
							fullWidth
							autoFocus
							variant="outlined"
							type="text"
							margin="dense"
							id="username"
							label="Username"
							error={!!formState.errors.username?.message}
							helperText={formState.errors.username?.message}
							{...register("username")}
						/>
						<TextField
							fullWidth
							variant="outlined"
							margin="dense"
							id="password"
							label="Password"
							type="password"
							error={!!formState.errors.password?.message}
							helperText={formState.errors.password?.message}
							{...register("password")}
						/>
						<Typography
							variant="subtitle2"
							display="block"
							sx={{
								textAlign: "center",
								marginTop: "10px",
								marginBottom: "10px",
							}}
						>
							or
						</Typography>
						<FacebookLogin
							appId="623374108791615"
							// autoLoad
							callback={(response) => {
								console.log(response);
								socialLogin(
									"fb",
									response.accessToken,
									closeModal,
									console.log
								);
							}}
							scope="public_profile, email"
							fields="name,email,picture"
							render={(renderProps) => (
								<Button
									variant="outlined"
									startIcon={
										<img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" />
									}
									fullWidth
									sx={{ marginBottom: "10px" }}
									onClick={renderProps.onClick}
								>
									Continue with Facebook
								</Button>
							)}
						/>

						<GoogleLogin
							clientId="880606660073-nimp0fn16r1qjrqkl3i093loe4oeplts.apps.googleusercontent.com"
							render={(renderProps) => (
								<Button
									variant="outlined"
									startIcon={
										<img src="https://img.icons8.com/color/48/000000/google-logo.png" />
									}
									fullWidth
									sx={{ marginBottom: "10px" }}
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
								>
									Continue with Google
								</Button>
							)}
							buttonText="Login"
							onSuccess={(response) => {
								console.log(response);
								socialLogin(
									"gg",
									response.tokenId,
									closeModal,
									console.log
								);
							}}
							onFailure={(response) => {
								console.log(response);
							}}
							cookiePolicy={"single_host_origin"}
						/>
					</DialogContent>
					<DialogActions>
						{!isSignUpModal ? (
							<Typography sx={{ marginLeft: "20px" }}>
								Does not have an account
								<Button
									sx={{ display: "block", margin: "auto" }}
									onClick={() => {
										setIsSignUpModal(true);
										setError("");
									}}
								>
									Sign Up
								</Button>
							</Typography>
						) : (
							<Typography sx={{ marginLeft: "20px" }}>
								Already have an account
								<Button
									sx={{ display: "block", margin: "auto" }}
									onClick={() => {
										setIsSignUpModal(false);
										setError("");
									}}
								>
									Sign In
								</Button>
							</Typography>
						)}
						<div style={{ flex: "1 0 0" }} />
						<Button onClick={closeModal}>Cancel</Button>
						<Button
							disabled={
								!formState.isValid || formState.isSubmitting
							}
							type="submit"
						>
							{isSignUpModal ? "Sign up" : "Sign in"}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export default SignInOrSignUpModal;
