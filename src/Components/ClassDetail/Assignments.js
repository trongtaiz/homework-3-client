import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Paper, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import AccordionActions from "@mui/material/AccordionActions";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import SaveIcon from "@mui/icons-material/Save";
import service from "Services/assignment.service";
function Assignments(props) {
	const [assignments, setAssignments] = React.useState([
		{
			name: "Midterm",
			point: 30,
			open: false,
		},
		{
			name: "Final",
			point: 40,
			open: false,
		},
		{
			name: "Homework",
			point: 30,
			open: false,
		},
	]);

	React.useEffect(() => {}, [assignments]);

	function addAssignment() {
		expandCloseAll();

		setAssignments((assignments) => [
			...assignments,
			{
				name: "",
				open: true,
				point: "",
			},
		]);
	}

	function deleteAssignment(i) {
		let qs = [...assignments];
		if (assignments.length > 1) {
			qs.splice(i, 1);
		}
		setAssignments(qs);
	}

	function handleAssignmentName(text, i) {
		var assignmentsList = [...assignments];
		assignmentsList[i].name = text;
		setAssignments(assignmentsList);
	}
	function handleAssignmentPoint(text, i) {
		var assignmentsList = [...assignments];
		assignmentsList[i].point = text;
		setAssignments(assignmentsList);
	}

	function saveHandle() {
		const data = {
			classID: props.id,
			assignments: assignments,
		};
		console.log(data);
		service.updateGradeStructure(data);
	}

	function onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		const cur = [...assignments];

		const res = reorder(cur, result.source.index, result.destination.index);

		setAssignments(res);
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	function showAsAssignment(i) {
		let qs = [...assignments];
		qs[i].open = false;
		setAssignments(qs);
	}

	function expandCloseAll() {
		let qs = [...assignments];
		for (let j = 0; j < qs.length; j++) {
			qs[j].open = false;
		}
		setAssignments(qs);
	}

	function handleExpand(i) {
		let qs = [...assignments];
		for (let j = 0; j < qs.length; j++) {
			if (i === j) {
				qs[i].open = true;
			} else {
				qs[j].open = false;
			}
		}
		setAssignments(qs);
	}

	function assignmentsUI() {
		return assignments.map((assignment, i) => (
			<Draggable key={i} draggableId={i + "id"} index={i}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div>
							<div style={{ marginBottom: "15px" }}>
								<div
									style={{
										width: "100%",
										marginBottom: "-7px",
									}}
								>
									<DragIndicatorIcon
										style={{
											transform: "rotate(-90deg)",
										}}
										fontSize="small"
									/>
								</div>

								<Accordion
									onChange={() => {
										handleExpand(i);
									}}
									expanded={assignments[i].open}
								>
									<AccordionSummary
										aria-controls="panel1a-content"
										id="panel1a-header"
										elevation={2}
									>
										{!assignments[i].open ? (
											<Box
												sx={{
													width: "100%",
													display: "flex",
													flexDirection: "row",
													marginLeft: "3px",
													paddingTop: "15px",
													paddingBottom: "15px",
												}}
											>
												<Typography
													variant="subtitle1"
													style={{
														flexGrow: 1,
													}}
												>
													{i + 1}. {assignment.name}
												</Typography>

												<Typography
													variant="subtitle1"
													style={{
														alignSelf: "flex-end",
													}}
												>
													{assignment.point +
														" points"}
												</Typography>
											</Box>
										) : (
											""
										)}
									</AccordionSummary>

									<AccordionDetails>
										<div
											style={{
												marginTop: "-50px",
												marginBottom: "-100px",
												display: "flex",
												width: "100%",
												justifyContent: "space-between",
											}}
										>
											<Typography
												style={{
													marginTop: "20px",
												}}
											>
												{i + 1}.
											</Typography>
											<TextField
												placeholder="Name"
												style={{
													flexGrow: 1,
													marginBottom: "18px",
												}}
												multiline={true}
												value={assignment.name}
												variant="filled"
												onChange={(e) => {
													handleAssignmentName(
														e.target.value,
														i
													);
												}}
											/>
											<TextField
												placeholder="Points"
												style={{
													marginBottom: "18px",
													marginLeft: "10px",
												}}
												multiline={true}
												value={assignment.point}
												variant="filled"
												onChange={(e) => {
													handleAssignmentPoint(
														e.target.value,
														i
													);
												}}
											/>
										</div>
									</AccordionDetails>

									<Divider />

									<AccordionActions>
										<IconButton
											aria-label="View"
											onClick={() => {
												showAsAssignment(i);
											}}
										>
											<VisibilityIcon />
										</IconButton>

										<Divider
											orientation="vertical"
											flexItem
										/>

										<IconButton
											aria-label="delete"
											onClick={() => {
												deleteAssignment(i);
											}}
										>
											<DeleteOutlineIcon />
										</IconButton>
									</AccordionActions>
								</Accordion>
							</div>
						</div>
					</div>
				)}
			</Draggable>
		));
	}

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Grid item xs={12} md={7} style={{ paddingTop: "10px" }}>
				<Paper elevation={5}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							marginLeft: "15px",
							paddingTop: "20px",
							paddingBottom: "20px",
						}}
					>
						<Typography
							variant="h4"
							style={{
								fontFamily: "sans-serif Roboto",
								marginBottom: "15px",
							}}
						>
							Assignments
						</Typography>
						<Typography variant="subtitle1">
							Assignments with grade structure
						</Typography>
					</div>
				</Paper>

				<Grid style={{ paddingTop: "10px" }}>
					<div>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="droppable">
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{assignmentsUI()}

										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
						<div>
							<Button
								variant="contained"
								onClick={addAssignment}
								endIcon={<AddCircleIcon />}
								style={{ margin: "5px" }}
							>
								Add Assignment{" "}
							</Button>

							<Button
								variant="contained"
								color="primary"
								style={{ margin: "15px" }}
								onClick={saveHandle}
								endIcon={<SaveIcon />}
							>
								Save Assignments{" "}
							</Button>
						</div>
					</div>
				</Grid>
			</Grid>
		</Grid>
	);
}
export default Assignments;
