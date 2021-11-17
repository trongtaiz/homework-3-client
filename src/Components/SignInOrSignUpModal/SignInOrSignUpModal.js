import React, { useState } from "react";

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

const validationSignInSchema = Yup.object().shape({
	email: Yup.string().trim().required("Email is required").email(),
	password: Yup.string().trim().required("Password is required").min(8),
});

const validationSignUpSchema = Yup.object().shape({
	email: Yup.string().trim().required("Email is required").email(),
	password: Yup.string().trim().required("Password is required").min(8),
	name: Yup.string().trim().required("Name is required").min(3),
});

function SignInOrSignUpModal({
	isOpen,
	onClose,
	isSignUpModal,
	setIsSignUpModal,
}) {
	const { signIn, signUp, socialLogin } = useSignInOrSignUpModal();
	const [error, setError] = useState("");

	const { handleSubmit, register, reset, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: isSignUpModal
			? {
					email: "",
					password: "",
					name: "",
			  }
			: { email: "", password: "" },
		resolver: yupResolver(
			isSignUpModal ? validationSignUpSchema : validationSignInSchema
		),
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
							? "Email has already been registered"
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
					setError("Invalid email or password");
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
							id="email"
							label="Email"
							error={!!formState.errors.email?.message}
							helperText={formState.errors.email?.message}
							{...register("email")}
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

						{isSignUpModal ? (
							<TextField
								fullWidth
								variant="outlined"
								type="text"
								margin="dense"
								id="name"
								label="Name"
								error={!!formState.errors.name?.message}
								helperText={formState.errors.name?.message}
								{...register("name")}
							/>
						) : null}
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
							clientId="880606660073-psuon1uhmrpvrcrco1rlc23e2cb7dm7g.apps.googleusercontent.com"
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
										reset();
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
										reset();
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
