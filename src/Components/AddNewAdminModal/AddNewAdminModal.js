/* eslint-disable no-undef */
import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import withCatch from "Utils/withCatch";
import * as Alert from "Utils/alert";

import { createAdmin } from "Services/admins.service";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.required("Email is require")
		.email("Please enter an valid email!"),
	password: Yup.string().required("Password is require").min(8),
	name: Yup.string().required("Name is require"),
});

const propTypes = {
	isOpenAddModal: PropTypes.bool,
	setIsOpenAddModal: PropTypes.func,
};

const defaultProps = {
	isOpenAddModal: false,
	setIsOpenAddModal: () => {},
};

function AddNewAdminModal(props) {
	const { isOpenAddModal, setIsOpenAddModal, setReloadTable } = props;

	const { handleSubmit, register, reset, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const closeModal = () => {
		reset();
		setIsOpenAddModal(false);
	};

	const signInFunc = async ({ email, password, name }) => {
		const [result, error] = await withCatch(
			createAdmin({ email, password, name })
		);
		if (error) {
			Alert.error("Something went wrong");
			reset();
			return;
		}
		if (result.status === 201) {
			Alert.success("Create admin success");
			setReloadTable((oldValue) => oldValue + 1);
			closeModal();
			return;
		}
	};

	return (
		<Dialog
			sx={{
				"& .MuiPaper-root": {
					borderRadius: "8px",
				},
			}}
			open={isOpenAddModal}
			onClose={closeModal}
		>
			<form onSubmit={handleSubmit(signInFunc)}>
				<DialogTitle>Login to admin dashboard</DialogTitle>
				<DialogContent>
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
						label="Password (*)"
						error={!!formState.errors.password?.message}
						helperText={formState.errors.password?.message}
						{...register("password")}
					/>
					<TextField
						fullWidth
						variant="outlined"
						type="text"
						margin="dense"
						id="name"
						label="Name (*)"
						error={!!formState.errors.name?.message}
						helperText={formState.errors.name?.message}
						{...register("name")}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						disabled={!formState.isValid || formState.isSubmitting}
						type="submit"
					>
						Create
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

AddNewAdminModal.propTypes = propTypes;
AddNewAdminModal.defaultProps = defaultProps;

export default AddNewAdminModal;
