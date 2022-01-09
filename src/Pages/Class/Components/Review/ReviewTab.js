/* eslint-disable no-undef */
import React from "react";
import { useSelector } from "react-redux";
import { Role } from "Utils/constants";
import ReviewTabOfStudent from "./ReviewTabOfStudent";
import ReviewTabOfTeacher from "./ReviewTabOfTeacher";

function ReviewTab({ id }) {
	console.log("id", id);
	const { role: role } = useSelector((state) => state.currentClass);
	return (
		<>
			{role === Role.STUDENT ? (
				<ReviewTabOfStudent></ReviewTabOfStudent>
			) : (
				<ReviewTabOfTeacher id={id}></ReviewTabOfTeacher>
			)}
		</>
	);
}

export default ReviewTab;
