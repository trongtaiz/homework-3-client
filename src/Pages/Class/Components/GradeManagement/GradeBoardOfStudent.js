import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Grid,
	IconButton,
	Tooltip,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableContainer,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HideSourceIcon from "@mui/icons-material/HideSource";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import * as classService from "Services/class.service";
import * as reviewService from "Services/review.service";
import RequestReviewModal from "Components/Review/RequestReviewModal";

export default function StudentGradeBoard() {
	const { studentId } = useSelector((state) => state.mapId);
	const { class: currentClass } = useSelector((state) => state.currentClass);
	const [assignmentPoints, setAssignmentPoints] = useState([]);
	const [selectedAssignmentId, setSelectedAssignmentId] = useState(0);
	const [openRequestReview, setOpenRequestReview] = useState(false);

	const openRequestReviewModel = (id) => {
		setOpenRequestReview(true);
		setSelectedAssignmentId(id);
	};
	const closeRequestReviewModel = () => {
		setOpenRequestReview(false);
	};
	const handleRequest = (assignmentId, expectedGrade, explanation) => {
		setOpenRequestReview(false);
		reviewService.createReview({
			assignmentId,
			studentId,
			classId: currentClass.id,
			explanation,
			expectedGrade,
		});
	};

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
										{parseInt(row.achievedPoint) >= 0 ? (
											row.achievedPoint
										) : (
											<HideSourceIcon />
										)}
									</TableCell>
									<TableCell align="right">
										{row.review ? (
											row.review.finalGrade ? (
												<Tooltip title="Review Completed">
													<IconButton color="success">
														<FactCheckIcon />
													</IconButton>
												</Tooltip>
											) : (
												<Tooltip title="Pending">
													<IconButton
														color="warning"
														component={Link}
														to={`/classes/${currentClass.id}/review-detail/${row.review.id}`}
													>
														<AutorenewIcon />
													</IconButton>
												</Tooltip>
											)
										) : (
											<Tooltip title="Request Review">
												<IconButton
													color="primary"
													onClick={() =>
														openRequestReviewModel(
															row.assignmentId
														)
													}
												>
													<RateReviewIcon />
												</IconButton>
											</Tooltip>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<RequestReviewModal
					assignmentId={selectedAssignmentId}
					open={openRequestReview}
					handleClose={closeRequestReviewModel}
					handleRequest={handleRequest}
				></RequestReviewModal>
			</Grid>
		</Grid>
	);
}
