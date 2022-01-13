import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { joinByCode } from "Services/class.service";

const propTypes = {
	isOpenModal: PropTypes.bool,
	setIsOpenModal: PropTypes.func,
};

const defaultProps = {
	isOpenModal: false,
	setIsOpenModal: () => {},
};

function JoinByCodeModal(props) {
	const history = useHistory();
	const { isOpenModal, setIsOpenModal } = props;
	const [code, setCode] = useState("");
	const [isSuccess, setIsSuccess] = useState(true);
	const [message, setMessage] = useState(true);

	//const linkJoinByCode = `${window.location.origin}/join-by-code?code=${code}`;
	const inputsHandler = (e) => {
		setCode(e.target.value);
	};

	const closeModal = () => {
		setCode("");
		setIsOpenModal(false);
		setIsSuccess(true);
	};

	const joinClass = async () => {
		try {
			const res = await joinByCode(code);
			if (res.status == 200 && !res.data.data.error) {
				console.log("bug", res.data.data.error, res);
				history.push(`/classes/${res.data.data.class_id}/stream`);
			} else {
				setIsSuccess(false);
				setMessage(res.data.data.error);
			}
		} catch (err) {
			console.log("err", err.message);
			setMessage("Failed to join class");
			setIsSuccess(false);
		}
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
					{isSuccess ? (
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
					) : (
						<TextField
							error
							fullWidth
							color="primary"
							variant="outlined"
							type="text"
							margin="dense"
							value={code}
							onChange={inputsHandler}
							label="Code Provided By Teacher"
							helperText={message}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={joinClass}>Join</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

JoinByCodeModal.propTypes = propTypes;
JoinByCodeModal.defaultProps = defaultProps;

export default JoinByCodeModal;
