/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dropzone from "react-dropzone";

import { templateStudentList, templateGradeList } from "Utils/constants";
import { exportToExcel } from "Utils/exportExcel";

import * as classService from "Services/class.service";

import * as Styled from "./UploadFileModal.styled";

const propTypes = {
	open: PropTypes.bool,
	setIsOpen: PropTypes.func,
	isUploadStudentFile: PropTypes.bool,
	assignmentId: PropTypes.number,
	reloadGradeBoard: PropTypes.func,
};

const defaultProps = {
	open: false,
	setIsOpen: () => {},
	isUploadStudentFile: true,
	assignmentId: 0,
	reloadGradeBoard: () => {},
};

function UploadFileModal(props) {
	const {
		open,
		setIsOpen,
		isUploadStudentFile,
		assignmentId,
		reloadGradeBoard,
	} = props;
	// const dispatch = useDispatch();
	const { class: currentClass } = useSelector((state) => state.currentClass);

	const [files, setFiles] = useState([]);
	const handleDrop = async (acceptedFiles) => {
		setFiles(acceptedFiles);
	};

	const closeModal = () => {
		setFiles([]);
		setIsOpen(false);
	};

	const handleDownloadStudentListTemplate = (e) => {
		e.preventDefault();
		exportToExcel(templateStudentList, "StudentList");
	};

	const handleDownloadGradeTemplate = (e) => {
		e.preventDefault();
		exportToExcel(templateGradeList, "GradeList");
	};

	const onUploadFileClick = async () => {
		if (isUploadStudentFile) {
			try {
				const formData = new FormData();
				formData.append("file", files[0]);
				formData.append("classId", currentClass.id);
				await classService.uploadStudentList(formData);
			} catch (e) {
				console.log(e);
			}
			closeModal();
			return;
		}
		try {
			const formData = new FormData();
			formData.append("file", files[0]);
			formData.append("classId", currentClass.id);
			formData.append("assignmentId", assignmentId);
			await classService.uploadGradeBoard(formData);
			reloadGradeBoard();
		} catch (e) {
			console.log(e);
		}
		closeModal();
	};

	return (
		<div>
			<Dialog
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "8px",
					},
				}}
				open={open}
				onClose={closeModal}
			>
				<DialogTitle>
					{isUploadStudentFile
						? "Upload student list"
						: "Upload grade list"}
				</DialogTitle>
				<DialogContent>
					<Styled.Wrapper>
						<Dropzone onDrop={handleDrop}>
							{({ getRootProps, getInputProps }) => (
								<Styled.Dropbox
									{...getRootProps({ className: "dropzone" })}
								>
									<input {...getInputProps()} />
									<p>
										Drag and drop files, or click to select
										files
									</p>
									{files.length ? (
										<p>File upload: {files[0].name}</p>
									) : (
										""
									)}
								</Styled.Dropbox>
							)}
						</Dropzone>
						<p>Click these link below to download template:</p>
						<Styled.Link
							onClick={handleDownloadStudentListTemplate}
						>
							Student list
						</Styled.Link>
						<Styled.Link onClick={handleDownloadGradeTemplate}>
							Grades for an assignment
						</Styled.Link>
					</Styled.Wrapper>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal}>Cancel</Button>
					<Button onClick={onUploadFileClick}>Upload</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

UploadFileModal.propTypes = propTypes;
UploadFileModal.defaultProps = defaultProps;

export default UploadFileModal;
