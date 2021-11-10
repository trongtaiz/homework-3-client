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
	section: Yup.string().trim(),
	subject: Yup.string().trim(),
	room: Yup.string().trim(),
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
			section: "",
			subject: "",
			room: "",
		},
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async ({ name, subject, section, room }) => {
		dispatch(addClass({ name, subject, section, room }));
		reset();
		setIsOpenAddModal(false);
	};

	const closeModal = () => {
		reset();
		setIsOpenAddModal(false);
	};

	return (
		<div>
			<Dialog
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "8px",
					},
				}}
				open={isOpenAddModal}
				onClose={closeModal}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle>Create a class</DialogTitle>
					<DialogContent>
						<TextField
							fullWidth
							autoFocus
							variant="filled"
							type="text"
							margin="dense"
							id="name"
							label="Class name (*)"
							error={!!formState.errors.name?.message}
							helperText={formState.errors.name?.message}
							{...register("name")}
						/>
						<TextField
							fullWidth
							variant="filled"
							type="text"
							margin="dense"
							id="name"
							label="Section"
							{...register("section")}
						/>
						<TextField
							fullWidth
							variant="filled"
							type="text"
							margin="dense"
							id="name"
							label="Subject"
							{...register("subject")}
						/>
						<TextField
							fullWidth
							variant="filled"
							type="text"
							margin="dense"
							id="name"
							label="room"
							{...register("room")}
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
