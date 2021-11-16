import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { RouterURL } from "Utils/constants";

import { joinClass } from "Services/class.service";

import * as Styled from "./JoinClass.styled";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function useQuery() {
	const { search } = useLocation();

	// eslint-disable-next-line no-undef
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function JoinClass() {
	const [loadingApi, setLoadingApi] = useState(1);
	const query = useQuery();
	const history = useHistory();

	const joinClassroom = async () => {
		const classId = query.get("classId");
		const inviteId = query.get("inviteId");
		try {
			const { data } = await joinClass({ classId, inviteId });

			if (data.data) {
				history.push(RouterURL.HOME);
			} else {
				setLoadingApi(0);
			}
		} catch (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
			setLoadingApi(0);
		}
	};

	useEffect(() => {
		joinClassroom();
	}, []);

	return (
		<Styled.Wrapper>
			{loadingApi ? (
				<CircularProgress />
			) : (
				<Typography variant="h5">Fail to join class</Typography>
			)}
		</Styled.Wrapper>
	);
}

export default JoinClass;
