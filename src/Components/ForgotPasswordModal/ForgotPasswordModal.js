/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { forgetPassword } from "Services/auth.service";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.required("Email is require")
		.email("Please enter an valid email!"),
});

const propTypes = {
	isOpenModal: PropTypes.bool,
	setIsOpenModal: PropTypes.func,
};

const defaultProps = {
	isOpenModal: false,
	setIsOpenModal: () => {},
};

function ForgotPasswordModal(props) {
	const { isOpenModal, setIsOpenModal } = props;

	const { handleSubmit, register, reset, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async ({ email }) => {
		console.log("run");
		try {
			console.log(email);
			await forgetPassword({
				email,
			});
		} catch (err) {
			console.error(err);
		}
		reset();
		setIsOpenModal(false);
	};

	const closeModal = () => {
		reset();
		setIsOpenModal(false);
	};
	return (
		<div>
			<Dialog
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "8px",
						width: "100%",
					},
				}}
				open={isOpenModal}
				onClose={closeModal}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle>Forgot you password</DialogTitle>
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
					</DialogContent>
					<DialogActions>
						<Button onClick={closeModal}>Cancel</Button>
						<Button
							disabled={
								!formState.isValid || formState.isSubmitting
							}
							type="submit"
						>
							Send email
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

ForgotPasswordModal.propTypes = propTypes;
ForgotPasswordModal.defaultProps = defaultProps;

export default ForgotPasswordModal;
