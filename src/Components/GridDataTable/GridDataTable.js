import React, { useEffect, useState } from "react";

import * as Alert from "Utils/alert";
import withCatch from "Utils/withCatch";

import { Grid } from "gridjs-react";

function GridDataTable(props) {
	const { getDataFunction, mapResultData, mapResultHeader, reloadTable } =
		props;
	const [dataList, setDataList] = useState([]);
	const [dataHeader, setDataHeader] = useState([]);
	const getDataList = async () => {
		const [result, error] = await withCatch(getDataFunction());

		if (error) {
			Alert.error("Something went wrong");
			return;
		}
		if (result.data?.data) {
			setDataList(mapResultData(result.data.data));
			setDataHeader(mapResultHeader(result.data.data));
		}
	};

	useEffect(() => {
		getDataList();
	}, [reloadTable]);

	return (
		<Grid
			data={dataList}
			columns={dataHeader}
			search={true}
			sort={true}
			pagination={{
				enabled: true,
				limit: 5,
			}}
		/>
	);
}

export default GridDataTable;
