import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function RequestReviewModal({
	open,
	handleClose,
	handleRequest,
	assignmentId,
}) {
	const [isValidGrade, setIsValidGrade] = useState(false);
	const [inputField, setInputField] = useState({
		expectedGrade: "",
		explanation: "",
	});

	const clearInput = () => {
		setInputField({ expectedGrade: "", explanation: "" });
	};
	const inputsHandler = (e) => {
		const grade = parseFloat(e.target.value);
		if (e.target.name === "expectedGrade") {
			setIsValidGrade(0 < grade && grade <= 10);
			setInputField({
				...inputField,
				expectedGrade: e.target.value,
			});
		} else
			setInputField({ ...inputField, [e.target.name]: e.target.value });
	};

	const onRequestReview = () => {
		if (isValidGrade) {
			handleRequest(
				assignmentId,
				parseInt(inputField.expectedGrade),
				inputField.explanation
			);
			clearInput();
		} else setIsValidGrade(false);
	};
	const onClose = () => {
		clearInput();
		handleClose();
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Request A Review</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To request a review, please fill in your explanation and
					expected grade here.
				</DialogContentText>
				{isValidGrade ? (
					<TextField
						required
						InputLabelProps={{ shrink: true }}
						sx={{ marginTop: 5 }}
						color="primary"
						autoFocus
						margin="dense"
						label="Expected Grade"
						type="number"
						inputProps={{ pattern: "[0-9]" }}
						fullWidth
						name="expectedGrade"
						onChange={inputsHandler}
						value={inputField.expectedGrade}
					/>
				) : (
					<TextField
						error
						helperText="Invalid Grade"
						InputLabelProps={{ shrink: true }}
						sx={{ marginTop: 5 }}
						color="primary"
						autoFocus
						margin="dense"
						label="Expected Grade"
						type="number"
						inputProps={{ pattern: "[0-9]" }}
						fullWidth
						name="expectedGrade"
						onChange={inputsHandler}
						value={inputField.expectedGrade}
					/>
				)}

				<TextField
					InputLabelProps={{ shrink: true }}
					color="primary"
					margin="dense"
					label="Explanation"
					fullWidth
					multiline
					name="explanation"
					minRows={2}
					onChange={inputsHandler}
					value={inputField.explanation}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onRequestReview}>Request</Button>
			</DialogActions>
		</Dialog>
	);
}
