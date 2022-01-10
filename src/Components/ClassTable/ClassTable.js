import React from "react";

import { getAllClass } from "Services/admins.service";

import GridDataTable from "Components/GridDataTable";

function ClassTable() {
	const mapResult = (result) => {
		return result.map(
			({ name, id, room, section, subject, user, createdAt }) => ({
				id: parseInt(id),
				name,
				room,
				section,
				subject,
				createdAt,
				createdBy: user.email,
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
		<GridDataTable
			getDataFunction={getAllClass}
			mapResultData={mapResultData}
			mapResultHeader={mapResultHeader}
		/>
	);
}

export default ClassTable;
