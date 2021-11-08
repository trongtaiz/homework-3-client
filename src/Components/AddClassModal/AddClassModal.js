import * as React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { addClass } from "Redux/actions/classes";

const validationSchema = Yup.object().shape({
	name: Yup.string().trim().required("Name of class is require"),
});

const propTypes = {
	isOpenAddModal: PropTypes.bool,
	setIsOpenAddModal: PropTypes.func,
};

const defaultProps = {
	isOpenAddModal: false,
	setIsOpenAddModal: () => {},
};

function AddClassModal(props) {
	const { isOpenAddModal, setIsOpenAddModal } = props;
	const dispatch = useDispatch();

	const { handleSubmit, register, reset, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		defaultValues: {
			name: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async ({ name }) => {
		dispatch(addClass({ name }));
		reset({ name: "" });
		setIsOpenAddModal(false);
	};

	return (
		<div>
			<Dialog
				open={isOpenAddModal}
				onClose={() => setIsOpenAddModal(false)}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle>Create a class</DialogTitle>
					<DialogContent sx={{ width: "40ch" }}>
						<TextField
							fullWidth
							autoFocus
							variant="standard"
							type="text"
							margin="dense"
							id="name"
							label="Class name:"
							error={!!formState.errors.name?.message}
							helperText={formState.errors.name?.message}
							{...register("name")}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setIsOpenAddModal(false)}>
							Cancel
						</Button>
						<Button
							disabled={
								!formState.isValid || formState.isSubmitting
							}
							type="submit"
						>
							Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

AddClassModal.propTypes = propTypes;
AddClassModal.defaultProps = defaultProps;

export default AddClassModal;
