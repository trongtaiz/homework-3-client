import * as React from "react";
import { useSelector } from "react-redux";
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
import { useEffect } from "react";
import * as classService from "Services/class.service";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function MappingAccountIDModal(props) {
	const { setOpenIdUpdate, open } = props;
	const [studentId, setStudentId] = React.useState("");
	const [prevStudentId, setPrevStudentId] = React.useState("");
	const [alertSuccess, setAlertSuccess] = React.useState(false);
	const [alertFailure, setAlertFailure] = React.useState(false);
	const { user } = useSelector((state) => state.auth);
	const { class: currentClass } = useSelector((state) => state.currentClass);
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

	useEffect(async () => {
		const prevId = await classService.fetchStudentId(
			currentClass?.id,
			user?.id
		);
		console.log("prevId", prevId.data.data);
		setPrevStudentId(prevId.data.data);
	}, [user, currentClass]);

	const handleClose = () => {
		setOpenIdUpdate(false);
	};

	const handleUpdate = async () => {
		if (studentId === prevStudentId || studentId === "") handleClose();
		else {
			try {
				const res = await classService.changeStudentId(
					currentClass.id,
					user?.id,
					studentId
				);
				console.log("res", res);
				if (res.status == 200) setAlertSuccess(true);
			} catch {
				setAlertFailure(true);
			}
			//else setAlertFailure(true);
		}
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
						To view your own grades, please enter your student ID
						here.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Student ID"
						type="string"
						defaultValue={prevStudentId || ""}
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

export default MappingAccountIDModal;
