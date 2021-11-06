import * as React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

	return (
		<div>
			<Dialog
				open={isOpenAddModal}
				onClose={() => setIsOpenAddModal(false)}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email
						address here. We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsOpenAddModal(false)}>
						Cancel
					</Button>
					<Button onClick={() => setIsOpenAddModal(false)}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

AddClassModal.propTypes = propTypes;
AddClassModal.defaultProps = defaultProps;

export default AddClassModal;
