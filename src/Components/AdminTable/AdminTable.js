import React, { useState } from "react";

import { getAllAdmin } from "Services/admins.service";

import GridDataTable from "Components/GridDataTable";
import AddNewAdminModal from "Components/AddNewAdminModal";

import Button from "@mui/material/Button";

function AdminTable() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);
	const mapResult = (result) => {
		return result.map(({ name, id, email, createdAt }) => ({
			id: parseInt(id),
			name,
			email,
			createdAt,
		}));
	};
	const mapResultData = (result) => {
		return mapResult(result).map((eachValue) => Object.values(eachValue));
	};

	const mapResultHeader = (result) => {
		return Object.keys(mapResult(result)[0] || {});
	};
	return (
		<div>
			<Button
				onClick={() => setIsAddModalOpen(true)}
				sx={{
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				}}
			>
				Add new admin
			</Button>
			<GridDataTable
				getDataFunction={getAllAdmin}
				mapResultData={mapResultData}
				mapResultHeader={mapResultHeader}
				reloadTable={reloadTable}
			/>
			<AddNewAdminModal
				isOpenAddModal={isAddModalOpen}
				setIsOpenAddModal={setIsAddModalOpen}
				setReloadTable={setReloadTable}
			/>
		</div>
	);
}

export default AdminTable;
