import React, { useState } from "react";
import PropTypes from "prop-types";
//import { useSelector } from "react-redux";

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

function JoinByCodeModal(props) {
	const { isOpenModal, setIsOpenModal } = props;
	//const { class: currentClass } = useSelector((state) => state.currentClass);
	//const { id, invite_id } = currentClass;
	const [code, setCode] = useState("");

	const inputsHandler = (e) => {
		setCode(e.target.value);
	};

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
				<DialogTitle>Join A Class By Code</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						color="primary"
						variant="outlined"
						type="text"
						margin="dense"
						value={code}
						onChange={inputsHandler}
						label="Code Provided By Teacher"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal}>Join</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

JoinByCodeModal.propTypes = propTypes;
JoinByCodeModal.defaultProps = defaultProps;

export default JoinByCodeModal;
