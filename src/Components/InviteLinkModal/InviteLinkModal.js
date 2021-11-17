import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const propTypes = {
	isOpenModal: PropTypes.bool,
	setIsOpenModal: PropTypes.func,
};

const defaultProps = {
	isOpenModal: false,
	setIsOpenModal: () => {},
};

function InviteLinkModal(props) {
	const { isOpenModal, setIsOpenModal } = props;
	const { class: currentClass } = useSelector((state) => state.currentClass);
	const { id, invite_id } = currentClass;
	const link = `${window.location.origin}/join-class?classId=${id}&inviteId=${invite_id}`;

	const closeModal = () => {
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
				<DialogTitle>Invite student to class</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						color="primary"
						variant="outlined"
						type="text"
						margin="dense"
						value={link}
						InputProps={{
							readOnly: true,
						}}
						label="Invite link"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

InviteLinkModal.propTypes = propTypes;
InviteLinkModal.defaultProps = defaultProps;

export default InviteLinkModal;
