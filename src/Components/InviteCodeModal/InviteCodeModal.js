/* eslint-disable no-undef */
import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import { Divider, Typography } from "@mui/material";

function InviteCodeModal({ isOpen, onClose, inviteLink, name, code }) {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const closeModal = () => {
		onClose();
	};

	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "8px",
					},
				}}
				open={isOpen}
				onClose={closeModal}
			>
				<DialogContent>
					<DialogTitle sx={{ textAlign: "center" }}>
						<Typography variant="h1" color="primary">
							{code}
						</Typography>
					</DialogTitle>
				</DialogContent>
				<Divider
					variant="middle"
					color="primary"
					sx={{ borderBottomWidth: 2 }}
				></Divider>
				<DialogActions style={{ alignContent: "space-between" }}>
					<Button
						sx={{
							display: "block",
							margin: "auto",
						}}
					>
						{name}
					</Button>

					<Button
						sx={{ display: "block" }}
						onClick={() => {
							navigator.clipboard.writeText(inviteLink);
							handleClick();
						}}
					>
						<ContentCopyIcon></ContentCopyIcon> {"    "}Copy the
						invitation link
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: "100%" }}
				>
					Copied invitation link!
				</Alert>
			</Snackbar>
		</div>
	);
}

export default InviteCodeModal;
