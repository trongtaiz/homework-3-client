import { GET_ASSIGNMENTS, UPDATE_ASSIGNMENTS } from "./types";

import * as assignmentService from "Services/assignment.service";

export const getAssignments = (classID) => async (dispatch) => {
	try {
		const { data } = await assignmentService.getAssignments(classID);
		dispatch({
			type: GET_ASSIGNMENTS,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};

export const updateAllAssignments =
	({ classId, assignments }) =>
	async (dispatch) => {
		try {
			const { data } = await assignmentService.getAssignments(classId);
			const currentAssignments = data.data;
			for (
				let i = 0;
				i < currentAssignments.length || i < assignments.length;
				i++
			) {
				if (i >= assignments.length) {
					assignmentService.deleteAssignments(
						currentAssignments[i].id
					);
				} else if (i >= currentAssignments.length) {
					assignmentService.createAssignments(assignments[i]);
				} else {
					assignmentService.updateAssignments(
						currentAssignments[i].id,
						assignments[i]
					);
				}
			}
			dispatch({
				type: UPDATE_ASSIGNMENTS,
				payload: data.data,
			});
		} catch (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
		}
	};
