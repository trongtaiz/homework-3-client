import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import withCatch from "Utils/withCatch";

import { joinClass, joinByEmail } from "Services/class.service";

import VerifyEmailPresentation from "Components/VerifyEmailPresentation";

function useQuery() {
	const { search } = useLocation();

	// eslint-disable-next-line no-undef
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function JoinClass() {
	const [loadingApi, setLoadingApi] = useState(0);
	const query = useQuery();
	const { joinClassToken } = useParams();

	const joinClassFunc = async () => {
		if (joinClassToken) {
			return joinByEmail(joinClassToken);
		}
		const classId = query.get("classId");
		const inviteId = query.get("inviteId");
		return joinClass({ classId, inviteId });
	};

	const joinClassroom = async () => {
		const [result, error] = await withCatch(joinClassFunc());
		if (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
			setLoadingApi(-1);
			return;
		}
		if (Object.keys(result.data).length !== 0) {
			setLoadingApi(1);
			return;
		}
		setLoadingApi(-1);
		// try {
		// 	let data = {};
		// 	if (token) {
		// 		data = await joinByEmail(token);
		// 	} else {
		// 		data = await joinClass({ classId, inviteId });
		// 	}

		// 	if (Object.keys(data.data).length !== 0) {
		// 		setLoadingApi(1);
		// 	} else {
		// 		setLoadingApi(-1);
		// 	}
		// } catch (error) {
		// 	// eslint-disable-next-line no-undef
		// 	console.log(error);
		// 	setLoadingApi(-1);
		// }
	};

	useEffect(() => {
		joinClassroom();
	}, []);

	return (
		<VerifyEmailPresentation
			isFullScreen={!!joinClassToken}
			isLoading={!loadingApi}
			isFailed={loadingApi === -1}
			messageToShow={["Fail to join class", "join class successfully"]}
		/>
	);
}

export default JoinClass;
