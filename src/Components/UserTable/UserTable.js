import React, { useState, useEffect } from "react";
import { _ } from "gridjs-react";

import { getAllUser, lockUser, mapStudentId } from "Services/admins.service";

import * as Alert from "Utils/alert";
import withCatch from "Utils/withCatch";

import GridDataTable from "Components/GridDataTable";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import ShowUserClassModal from "Components/ShowUserClassModal";

function RenderInput(props) {
	const { initId, userId, setReloadTable } = props;
	const [studentId, setId] = useState(initId);

	useEffect(() => {
		setId(initId);
	}, [initId]);

	const handleChangePoint = async () => {
		const [result, error] = await withCatch(
			mapStudentId({ userId, studentId: studentId || null })
		);

		if (error) {
			Alert.error("Something went wrong");
			return;
		}
		if (result.data?.data) {
			Alert.success("Success change student id");
			setReloadTable((oldValue) => oldValue + 1);
		}
	};
	return (
		<TextField
			variant="standard"
			value={studentId}
			onChange={(e) => setId(e.target.value)}
			onBlur={handleChangePoint}
		/>
	);
}

function UserTable() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const [reloadTable, setReloadTable] = useState(0);
	const lockAccount = async ({ userId, isLocked }) => {
		const [result, error] = await withCatch(lockUser({ userId, isLocked }));

		if (error) {
			Alert.error("Something went wrong");
			return;
		}
		if (result.data?.data) {
			Alert.success("Success locked user");
			setReloadTable((oldValue) => oldValue + 1);
		}
	};

	const toggleUserDetailModal = (e, id) => {
		e.preventDefault();
		setUserId(id);
		setIsModalOpen(true);
	};

	const mapResult = (result) => {
		return result.map(
			({
				name,
				id,
				studentId,
				email,
				createdAt,
				isLocked,
				isActive,
			}) => ({
				id: parseInt(id),
				name,
				studentId: _(
					<RenderInput
						initId={studentId}
						userId={id}
						setReloadTable={setReloadTable}
					/>
				),
				email,
				createdAt,
				Locked: isLocked ? "Locked" : "Normal",
				Status: isActive ? "Activated" : "Pending",
				Action: _(
					<Button
						onClick={() =>
							lockAccount({
								userId: id,
								isLocked: !isLocked,
							})
						}
					>
						{isLocked ? "UnBan Account" : "Ban Account"}
					</Button>
				),
				Detail: _(
					<Button onClick={(e) => toggleUserDetailModal(e, id)}>
						show list class
					</Button>
				),
			})
		);
	};
	const mapResultData = (result) => {
		return mapResult(result).map((eachValue) => Object.values(eachValue));
	};

	const mapResultHeader = (result) => {
		return Object.keys(mapResult(result)[0] || {});
	};
	return (
		<div>
			<GridDataTable
				getDataFunction={getAllUser}
				mapResultData={mapResultData}
				mapResultHeader={mapResultHeader}
				reloadTable={reloadTable}
			/>
			<ShowUserClassModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				userId={userId}
			/>
		</div>
	);
}

export default UserTable;
