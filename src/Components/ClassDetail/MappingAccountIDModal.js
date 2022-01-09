import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { connect } from "react-redux";
import { changeStudentId, fetchStudentId } from "../../Redux/actions/classes";
import { useEffect } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function MappingAccountIDModal(props) {
	const { mapId, setOpenIdUpdate, open, user, currentClass } = props;
	const [studentId, setStudentId] = React.useState("");
	const [alertSuccess, setAlertSuccess] = React.useState(false);
	const [alertFailure, setAlertFailure] = React.useState(false);
	const handleCloseAlertSuccess = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setAlertSuccess(false);
		setOpenIdUpdate(false);
	};
	const handleCloseAlertFailure = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setAlertFailure(false);
		setOpenIdUpdate(false);
	};

	useEffect(() => {
		props.fetchStudentId(currentClass.class.id, user?.id);
	}, [user, currentClass]);

	useEffect(() => {
		if (mapId.success) setAlertSuccess(true);
		if (mapId.success == false) setAlertFailure(true);
	}, [mapId]);

	const handleClose = () => {
		setOpenIdUpdate(false);
	};

	const handleUpdate = () => {
		if (studentId === mapId.studentId || studentId === "") handleClose();
		else props.changeStudentId(currentClass.class.id, user?.id, studentId);
	};

	const handleOnChange = (e) => {
		setStudentId(e.target.value);
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update Student ID</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To view your own gradings, please enter your student ID
						here.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Student ID"
						type="string"
						defaultValue={
							mapId.studentId == null ? "" : mapId.studentId
						}
						fullWidth
						variant="standard"
						onChange={handleOnChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleUpdate}>Update</Button>
				</DialogActions>
			</Dialog>
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar
					open={alertSuccess}
					autoHideDuration={1000}
					onClose={handleCloseAlertSuccess}
				>
					<Alert
						onClose={handleCloseAlertSuccess}
						severity="success"
						sx={{ width: "100%" }}
					>
						Update Student ID successfully!
					</Alert>
				</Snackbar>
				<Snackbar
					open={alertFailure}
					autoHideDuration={1000}
					onClose={handleCloseAlertFailure}
				>
					<Alert
						onClose={handleCloseAlertFailure}
						severity="error"
						sx={{ width: "100%" }}
					>
						This Student ID is not available
					</Alert>
				</Snackbar>
			</Stack>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		currentClass: state.currentClass,
		mapId: state.mapId,
	};
};

export default connect(mapStateToProps, { fetchStudentId, changeStudentId })(
	MappingAccountIDModal
);
