/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";
import { Role } from "Utils/constants";

import StudentGrade from "./GradeTabOfStudent";
import GradeTabOfTeacher from "./GradeTabOfTeacher";

function GradeBoard({ id }) {
	const { role: role } = useSelector((state) => state.currentClass);
	return (
		<>
			{role === Role.STUDENT ? (
				<StudentGrade></StudentGrade>
			) : (
				<GradeTabOfTeacher id={id}></GradeTabOfTeacher>
			)}
		</>
	);
}

export default GradeBoard;
