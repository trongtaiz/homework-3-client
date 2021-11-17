/* eslint-disable no-undef */
import * as React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Role } from "Utils/constants";

import { inviteEmail } from "Services/class.service";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.required("Email is require")
		.email("Please enter an valid email!"),
	role: Yup.string().required("Role is require").nullable(true),
});

const propTypes = {
	isOpenModal: PropTypes.bool,
	setIsOpenModal: PropTypes.func,
};

const defaultProps = {
	isOpenModal: false,
	setIsOpenModal: () => {},
};

function InviteEmailModal(props) {
	const { isOpenModal, setIsOpenModal } = props;
	const { class: currentClass } = useSelector((state) => state.currentClass);

	const { handleSubmit, register, reset, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			role: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async ({ email, role }) => {
		try {
			await inviteEmail({
				userEmail: email,
				role,
				classId: currentClass.id,
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
					<DialogTitle>Create a class</DialogTitle>
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
						<RadioGroup aria-label="gender">
							<FormControlLabel
								value={Role.STUDENT}
								control={<Radio />}
								label="Student"
								{...register("role")}
							/>
							<FormControlLabel
								value={Role.TEACHER}
								control={<Radio />}
								label="Teacher"
								{...register("role")}
							/>
						</RadioGroup>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeModal}>Cancel</Button>
						<Button
							disabled={
								!formState.isValid || formState.isSubmitting
							}
							type="submit"
						>
							Send
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

InviteEmailModal.propTypes = propTypes;
InviteEmailModal.defaultProps = defaultProps;

export default InviteEmailModal;
