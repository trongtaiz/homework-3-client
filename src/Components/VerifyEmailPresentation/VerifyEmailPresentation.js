import React from "react";
import { useHistory } from "react-router-dom";

import { RouterURL } from "Utils/constants";

import * as Styled from "./VerifyEmailPresentation.styled";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function VerifyEmailPresentation(props) {
	const { isFullScreen, isLoading, isFailed, messageToShow } = props;

	const history = useHistory();

	const handleClickHome = (e) => {
		e.preventDefault();
		history.push(RouterURL.HOME);
	};

	return (
		<Styled.Wrapper $isFullscreen={isFullScreen}>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Styled.TextHolder>
					<Typography align="center" variant="h5">
						{isFailed ? messageToShow[0] : messageToShow[1]}
					</Typography>
					<Typography align="center" variant="p">
						{isFailed
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

export default VerifyEmailPresentation;
