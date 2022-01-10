/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";
import { Role } from "Utils/constants";

import GradeTabOfStudent from "./GradeTabOfStudent";
import GradeTabOfTeacher from "./GradeTabOfTeacher";

function GradeTab({ id }) {
	const { role: role } = useSelector((state) => state.currentClass);
	return (
		<>
			{role === Role.STUDENT ? (
				<GradeTabOfStudent></GradeTabOfStudent>
			) : (
				<GradeTabOfTeacher id={id}></GradeTabOfTeacher>
			)}
		</>
	);
}

export default GradeTab;
