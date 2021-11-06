import styled from "styled-components";
import { makeStyles } from "@mui/styles";

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.div`
	border-radius: 16px;
	max-height: calc(100vh - 30px);
	max-width: calc(100% - 30px);
	overflow: hidden;
`;

export const Content = styled.div`
	background-color: white;
	min-width: 350px;
	padding: 32px;
	position: relative;

	min-width: 380px;
	padding: 32px;
`;

export const Title = styled.div`
	margin: 0px 0 20px;
	font-size: 24px;
	text-align: center;
	font-weight: 500;
`;

export const CloseIconStyles = makeStyles({
	root: {
		position: "absolute",
		top: "24px",
		right: "24px",
		cursor: "pointer",
	},
});
