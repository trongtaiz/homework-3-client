/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TableRow, TableHead, TableBody } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ToggleButton from "@mui/material/ToggleButton";
import UploadFileModal from "Components/UploadFileModal";
import DownloadIcon from "@mui/icons-material/Download";

import * as classService from "Services/class.service";
import * as assignmentService from "Services/assignment.service";

import { exportToExcel } from "Utils/exportExcel";

import * as Styled from "./GradeBoard.styled";
import { Box, Tooltip } from "@mui/material";

function RenderInput(props) {
	const {
		initPoint,
		review,
		classId,
		assignmentId,
		studentId,
		isEditable = true,
		reloadPoint,
	} = props;
	const [point, setPoint] = useState(initPoint);

	useEffect(() => {
		setPoint(initPoint);
	}, [initPoint]);

	const handleChangePoint = async () => {
		if (isNaN(point) || !isEditable) {
			return;
		}
		try {
			await assignmentService.updateStudentPoints({
				classId,
				assignmentId,
				studentId,
				achievedPoint: parseInt(point),
			});
			reloadPoint();
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<TextField
				variant="standard"
				value={point}
				onChange={(e) => setPoint(e.target.value)}
				onBlur={handleChangePoint}
				InputProps={{
					readOnly: !isEditable,
				}}
				helperText={isEditable ? "out of 100" : "out of 10"}
			/>

			{review ? (
				review.finalGrade ? (
					<Tooltip title="Finalized Review">
						<IconButton
							color="success"
							component={Link}
							to={`/classes/${classId}/review-detail/${review.id}`}
						>
							<FactCheckIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Pending Review">
						<IconButton
							color="primary"
							component={Link}
							to={`/classes/${classId}/review-detail/${review.id}`}
						>
							<RateReviewIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				)
			) : (
				<IconButton disabled color="primary">
					<RateReviewIcon fontSize="small" />
				</IconButton>
			)}
		</Box>
	);
}

function RenderHeader(props) {
	const { header, reloadGradeBoard } = props;
	const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);
	const [isFinalized, setIsFinalized] = useState(header.isFinalized);
	const handleUploadModal = () => {
		setIsOpenUploadFileModal(true);
	};
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography sx={{ fontWeight: "bold" }}>{header.name} </Typography>
			<div>
				{header.id !== 0 && (
					<IconButton onClick={handleUploadModal} color="primary">
						<FileUploadIcon fontSize="small" />
					</IconButton>
				)}
				<Tooltip title="Finalize">
					<ToggleButton
						size="small"
						value="check"
						color="success"
						selected={isFinalized}
						onChange={() => {
							assignmentService.finalizeAssignments({
								assignmentId: header.id,
								isFinalized: !isFinalized,
							});
							setIsFinalized(!isFinalized);
						}}
					>
						<DoneAllIcon fontSize="small" />
					</ToggleButton>
				</Tooltip>
			</div>
			<UploadFileModal
				open={isOpenUploadFileModal}
				setIsOpen={setIsOpenUploadFileModal}
				isUploadStudentFile={false}
				assignmentId={parseInt(header.id)}
				reloadGradeBoard={reloadGradeBoard}
			/>
		</Box>
	);
}

function GradeTabOfTeacher(props) {
	const { id } = props;
	const [pointTable, setPointTable] = useState([]);
	const [assignment, setAssignment] = useState([]);
	const [gradeBoard, setGradeBoard] = useState([]);
	const [exportArray, setExportArray] = useState([]);

	const getPointTableData = async () => {
		try {
			const { data = {} } = await classService.getPointsTable({
				classId: id,
			});
			return data.data;
		} catch (e) {
			console.log(e);
		}
	};

	function transpose(n) {
		var s = [];
		for (var i = 0; i < n[0].length; i++) {
			var x = [];
			for (var j = 0; j < n.length; j++) {
				x.push(n[j][i]);
			}
			s.push(x);
		}
		return s;
	}

	const getAssignmentArray = async () => {
		try {
			const { data = {} } = await assignmentService.getAssignments(id);
			return data.data;
		} catch (e) {
			console.log(e);
		}
	};

	const initGradeBoard = async () => {
		const pointData = await getPointTableData();
		const assignmentData = await getAssignmentArray();
		setPointTable(pointData);
		setAssignment(assignmentData);
	};

	const transformTableData = () => {
		let pointArray = [];
		const studentArray = [];
		const downloadArray = [];
		studentArray.push("Student");
		pointTable.forEach(({ studentId, fullName, ...rest }) => {
			studentArray.push({
				studentId,
				name: fullName,
				isActive: !!rest.studentAccount,
			});
			downloadArray.push({ fullName });
		});
		pointArray.push(studentArray);
		assignment.forEach((eachAssign) => {
			const tempArray = [];
			tempArray.push({
				name: eachAssign.title,
				id: eachAssign.id,
				percent: eachAssign.point,
				isFinalized: eachAssign.isFinalized,
			});
			pointTable.forEach((student, index) => {
				if (student.assignments) {
					const assignmentStudent = student.assignments.find(
						(el) => el.assignmentId === eachAssign.id
					);
					if (assignmentStudent) {
						tempArray.push({
							point: assignmentStudent.achievedPoint,
							review: assignmentStudent.review,
						});
						downloadArray[index][eachAssign.title] =
							assignmentStudent.achievedPoint;
					} else {
						downloadArray[index][eachAssign.title] = "null";
						tempArray.push("null");
					}
				} else {
					downloadArray[index][eachAssign.title] = "null";
					tempArray.push("null");
				}
			});
			pointArray.push(tempArray);
		});
		pointArray = transpose(pointArray);
		pointArray[0].push({ name: "Total grade", id: 0 });
		pointArray.map((eachRow, i) => {
			if (i === 0) return eachRow;
			let totalGrade = 0;
			eachRow.forEach((eachPoints, j) => {
				if (j > 0) {
					totalGrade =
						totalGrade +
						(eachPoints !== "null" ? eachPoints.point : 0) *
							pointArray[0][j].percent;
				}
			});
			downloadArray[i - 1]["Total"] = totalGrade / 100;
			return eachRow.push({ point: totalGrade / 100 });
		});
		setExportArray(downloadArray);
		setGradeBoard(pointArray);
	};

	const handleDownloadGradeTemplate = (e) => {
		e.preventDefault();
		exportToExcel(exportArray, "Student grade board");
	};

	useEffect(() => {
		initGradeBoard();

		return () => {
			setPointTable([]);
			setAssignment([]);
		};
	}, []);

	useEffect(() => {
		if (pointTable?.length && assignment?.length) transformTableData();
	}, [pointTable, assignment]);

	return (
		<Styled.Wrapper>
			{gradeBoard.length && (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								{gradeBoard[0].map((eachValue, i) => (
									<TableCell key={i}>
										{eachValue.name ? (
											<RenderHeader
												header={eachValue}
												reloadGradeBoard={
													initGradeBoard
												}
											/>
										) : (
											<div>
												<div>{eachValue}</div>
												<Tooltip title="Download grade board">
													<IconButton
														onClick={
															handleDownloadGradeTemplate
														}
														color="primary"
													>
														<DownloadIcon fontSize="small" />
													</IconButton>
												</Tooltip>
											</div>
										)}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{gradeBoard.map((eachRow, i) => (
								<TableRow key={i}>
									{eachRow.map(
										(eachCell, j) =>
											i > 0 && (
												<TableCell align="left" key={j}>
													{eachCell.name ? (
														i > 0 &&
														j === 0 &&
														eachCell.isActive ? (
															<Styled.Link>
																{eachCell.name}
															</Styled.Link>
														) : (
															eachCell.name
														)
													) : i > 0 && j > 0 ? (
														<RenderInput
															initPoint={
																eachCell.point
															}
															review={
																eachCell.review
															}
															classId={id}
															reloadPoint={
																initGradeBoard
															}
															assignmentId={
																gradeBoard[0][j]
																	.id
															}
															studentId={
																eachRow[0]
																	.studentId
															}
															isEditable={
																j + 1 !==
																gradeBoard[0]
																	.length
															}
														/>
													) : (
														eachCell.point
													)}
												</TableCell>
											)
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Styled.Wrapper>
	);
}

export default GradeTabOfTeacher;
