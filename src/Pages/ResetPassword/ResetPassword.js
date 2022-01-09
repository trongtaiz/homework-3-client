/* eslint-disable no-undef */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import withCatch from "Utils/withCatch";

import { resetPassword } from "Services/auth.service";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import * as Styled from "./ResetPassword.styled";

const validationSchema = Yup.object().shape({
	newPassword: Yup.string().required("New password is require").min(8),
	newPasswordAgain: Yup.string()
		.oneOf([Yup.ref("newPassword"), null], "Passwords must match")
		.min(8),
});

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ResetPassword() {
	const { resetPassToken } = useParams();
	const [toastValue, setToast] = useState(0);

	const { handleSubmit, register, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			newPassword: "",
			newPasswordAgain: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const resetPasswordFunc = async ({ newPassword }) => {
		const [result, error] = await withCatch(
			resetPassword({ token: resetPassToken, newPassword })
		);
		if (error) {
			setToast(-1);
			return;
		}
		if (result.status === 201) {
			setToast(1);
			return;
		}
	};

	const handleClose = () => {
		setToast(0);
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
				<form onSubmit={handleSubmit(resetPasswordFunc)}>
					<DialogTitle>Reset your password</DialogTitle>
					<DialogContent
						sx={{
							overflowY: "visible",
						}}
					>
						<TextField
							fullWidth
							autoFocus
							variant="outlined"
							type="password"
							margin="dense"
							id="name"
							name="password"
							label="New password (*)"
							error={!!formState.errors.newPassword?.message}
							helperText={formState.errors.newPassword?.message}
							{...register("newPassword")}
						/>
						<TextField
							fullWidth
							variant="outlined"
							type="password"
							margin="dense"
							id="name"
							name="confirmPassword"
							label="Confirm you password (*)"
							error={!!formState.errors.newPasswordAgain?.message}
							helperText={
								formState.errors.newPasswordAgain?.message
							}
							{...register("newPasswordAgain")}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							disabled={
								!formState.isValid || formState.isSubmitting
							}
							type="submit"
						>
							Reset
						</Button>
					</DialogActions>
				</form>
				<Snackbar
					open={!!toastValue}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity={toastValue === 1 ? "success" : "error"}
						sx={{ width: "100%" }}
					>
						{toastValue === 1
							? "Success reset password"
							: "Failed to reset password"}
					</Alert>
				</Snackbar>
			</Dialog>
		</Styled.Wrapper>
	);
}

export default ResetPassword;
