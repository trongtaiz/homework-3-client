/* eslint-disable no-undef */
import React from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import withCatch from "Utils/withCatch";
import * as Alert from "Utils/alert";

import { resetPassword } from "Services/auth.service";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import * as Styled from "./ResetPassword.styled";

const validationSchema = Yup.object().shape({
	newPassword: Yup.string().required("New password is require").min(8),
	newPasswordAgain: Yup.string()
		.oneOf([Yup.ref("newPassword"), null], "Passwords must match")
		.min(8),
});

function ResetPassword() {
	const { resetPassToken } = useParams();

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
			Alert.error("Failed to reset password");
			return;
		}
		if (result.status === 201) {
			Alert.success("Success reset password");
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
							id="password"
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
							id="confirmPassword"
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
			</Dialog>
		</Styled.Wrapper>
	);
}

export default ResetPassword;
