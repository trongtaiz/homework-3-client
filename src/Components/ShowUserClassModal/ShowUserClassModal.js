/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getUserClasses } from "Services/admins.service";

import withCatch from "Utils/withCatch";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const propTypes = {
	isOpen: PropTypes.bool,
	setIsOpen: PropTypes.func,
	teacherClass: PropTypes.array,
	userId: PropTypes.string,
};

const defaultProps = {
	isOpen: false,
	setIsOpen: () => {},
	userId: "",
};

function ShowUserClassModal(props) {
	const { isOpen, setIsOpen, userId } = props;
	const [teacherClass, setTeacherClass] = useState([]);
	const [studentClass, setStudentClass] = useState([]);

	const closeModal = () => {
		setIsOpen(false);
	};

	const getUser = async () => {
		const [result, error] = await withCatch(getUserClasses({ userId }));
		if (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
			return;
		}
		if (result.data.data) {
			setTeacherClass(
				result.data.data.asTeachers.map(({ name }) => name)
			);
			setStudentClass(
				result.data.data.asStudents.map(({ name }) => name)
			);
		}
	};

	useEffect(() => {
		getUser();
	}, [userId]);

	return (
		<Dialog
			sx={{
				"& .MuiPaper-root": {
					borderRadius: "8px",
					width: "50%",
				},
			}}
			open={isOpen}
			onClose={closeModal}
		>
			<DialogTitle>List class of user</DialogTitle>

			<DialogContent>
				{teacherClass.length ? (
					<div>
						<h4>Teacher class:</h4>
						{teacherClass.map((name, i) => (
							<p key={i}>{name}</p>
						))}
					</div>
				) : (
					""
				)}

				{studentClass.length ? (
					<div>
						<h4>Student class:</h4>
						{studentClass.map((name, i) => (
							<p key={i}>{name}</p>
						))}
					</div>
				) : (
					""
				)}
			</DialogContent>
		</Dialog>
	);
}

ShowUserClassModal.propTypes = propTypes;
ShowUserClassModal.defaultProps = defaultProps;

export default ShowUserClassModal;
