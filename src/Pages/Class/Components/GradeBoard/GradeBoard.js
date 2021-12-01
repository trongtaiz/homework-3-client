/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

// import XLSX from "xlsx";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadFileModal from "Components/UploadFileModal";

import * as classService from "Services/class.service";
import * as assignmentService from "Services/assignment.service";

import * as Styled from "./GradeBoard.styled";

function RenderInput(props) {
	const {
		initPoint,
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
		<TextField
			variant="standard"
			value={point}
			onChange={(e) => setPoint(e.target.value)}
			onBlur={handleChangePoint}
			InputProps={{
				readOnly: !isEditable,
			}}
		/>
	);
}

function RenderHeader(props) {
	const { header, reloadGradeBoard } = props;
	const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);
	const handleUploadModal = () => {
		setIsOpenUploadFileModal(true);
	};
	return (
		<Typography sx={{ fontWeight: "bold" }}>
			{header.name}{" "}
			{header.id !== 0 && (
				<IconButton onClick={handleUploadModal} color="inherit">
					<FileUploadIcon />
				</IconButton>
			)}
			<UploadFileModal
				open={isOpenUploadFileModal}
				setIsOpen={setIsOpenUploadFileModal}
				isUploadStudentFile={false}
				assignmentId={header.id}
				reloadGradeBoard={reloadGradeBoard}
			/>
		</Typography>
	);
}

function GradeBoard(props) {
	const { id } = props;
	const [pointTable, setPointTable] = useState([]);
	const [assignment, setAssignment] = useState([]);
	const [gradeBoard, setGradeBoard] = useState([]);

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
		studentArray.push("Student");
		pointTable.forEach(({ studentId, fullName, ...rest }) => {
			studentArray.push({
				studentId,
				name: fullName,
				isActive: !!rest.studentAccount,
			});
		});
		pointArray.push(studentArray);
		assignment.forEach((eachAssign) => {
			const tempArray = [];
			tempArray.push({
				name: eachAssign.title,
				id: eachAssign.id,
				percent: eachAssign.point,
			});
			pointTable.forEach((student) => {
				if (student.assignments) {
					const assignmentStudent = student.assignments.find(
						(el) => el.assignmentId === eachAssign.id
					);
					if (assignmentStudent) {
						tempArray.push(assignmentStudent.achievedPoint);
					} else {
						tempArray.push("null");
					}
				} else {
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
						(eachPoints !== "null" ? eachPoints : 0) *
							pointArray[0][j].percent;
				}
			});
			return eachRow.push(totalGrade);
		});
		setGradeBoard(pointArray);
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
						<TableRow>
							{gradeBoard[0].map((eachValue, i) => (
								<TableCell key={i}>
									{eachValue.name ? (
										<RenderHeader
											header={eachValue}
											reloadGradeBoard={initGradeBoard}
										/>
									) : (
										eachValue
									)}
								</TableCell>
							))}
						</TableRow>
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
														initPoint={eachCell}
														classId={id}
														reloadPoint={
															initGradeBoard
														}
														assignmentId={
															gradeBoard[0][j].id
														}
														studentId={
															eachRow[0].studentId
														}
														isEditable={
															j + 1 !==
															gradeBoard[0].length
														}
													/>
												) : i > 0 && j > 0 ? (
													adas
												) : (
													eachCell
												)}
											</TableCell>
										)
								)}
							</TableRow>
						))}
					</Table>
				</TableContainer>
			)}
		</Styled.Wrapper>
	);
}

export default GradeBoard;
