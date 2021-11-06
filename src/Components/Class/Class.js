import React from "react";

import Typography from "@mui/material/Typography";

import * as Styled from "./Class.styled";

function Class(props) {
	const { name } = props;
	return (
		<Styled.MyCard>
			<Styled.ClassWrapper>
				<Typography variant="h5">{name}</Typography>
			</Styled.ClassWrapper>
		</Styled.MyCard>
	);
}

export default Class;
