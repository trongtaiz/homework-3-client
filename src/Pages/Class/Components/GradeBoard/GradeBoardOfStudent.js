import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as classService from "Services/class.service";

export default function StudentGradeBoard() {
	const { studentId } = useSelector((state) => state.mapId);
	const { class: currentClass } = useSelector((state) => state.currentClass);
	const [assignmentPoints, setAssignmentPoints] = React.useState([]);

	const openReviewModel = () => {};
	useEffect(async () => {
		const { data } = await classService.getAllPointOfAStudent(
			studentId,
			currentClass.id
		);
		setAssignmentPoints(data.data);
	}, [studentId, currentClass]);
	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Grid item xs={12} md={8} style={{ paddingTop: "10px" }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 500 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Assignment</TableCell>
								<TableCell align="right">%</TableCell>
								<TableCell align="right">Point</TableCell>
								<TableCell align="right">Review</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{assignmentPoints?.map((row) => (
								<TableRow
									key={row.detail.title}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.detail.title}
									</TableCell>
									<TableCell align="right">
										{row.detail.point}
									</TableCell>
									<TableCell align="right">
										{row.achievedPoint}
									</TableCell>
									<TableCell align="right">
										<IconButton
											color="primary"
											onClick={openReviewModel}
										>
											<RateReviewIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
}
