import styled from "styled-components";
import Card from "@mui/material/Card";
import { Link as RouterLink } from "react-router-dom";

export const ClassWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const MyCard = styled(Card)`
	width: 294px;
	border: 0.5px solid rgb(218, 220, 224);
	border-radius: 8px;
`;

export const Link = styled(RouterLink)`
	text-decoration: none;
	color: black;

	&:visited {
		color: black;
	}
`;
