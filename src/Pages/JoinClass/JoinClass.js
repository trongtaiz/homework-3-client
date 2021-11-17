import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { RouterURL } from "Utils/constants";

import { joinClass, joinByEmail } from "Services/class.service";

import * as Styled from "./JoinClass.styled";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function useQuery() {
	const { search } = useLocation();

	// eslint-disable-next-line no-undef
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

function JoinClass() {
	const [loadingApi, setLoadingApi] = useState(0);
	const query = useQuery();
	const history = useHistory();
	const { token } = useParams();

	const joinClassroom = async () => {
		const classId = query.get("classId");
		const inviteId = query.get("inviteId");
		try {
			let data = {};
			if (token) {
				data = await joinByEmail(token);
			} else {
				data = await joinClass({ classId, inviteId });
			}

			if (Object.keys(data.data).length !== 0) {
				setLoadingApi(1);
			} else {
				setLoadingApi(-1);
			}
		} catch (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
			setLoadingApi(-1);
		}
	};

	const handleClickHome = (e) => {
		e.preventDefault();
		history.push(RouterURL.HOME);
	};

	useEffect(() => {
		joinClassroom();
	}, []);

	return (
		<Styled.Wrapper $isFullscreen={!!token}>
			{loadingApi === 0 ? (
				<CircularProgress />
			) : (
				<Styled.TextHolder>
					<Typography align="center" variant="h5">
						{loadingApi === -1
							? "Fail to join class!"
							: "Successfully join this class!"}
					</Typography>
					<Typography align="center" variant="p">
						{loadingApi === -1
							? "Please try again later!"
							: "Please head to home page"}
					</Typography>
					<Button onClick={handleClickHome} variant="contained">
						Return to home
					</Button>
				</Styled.TextHolder>
			)}
		</Styled.Wrapper>
	);
}

export default JoinClass;
