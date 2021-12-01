import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { Colors } from "Utils/constants";

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	p {
		margin: 5px 0;
	}
`;

export const Link = styled.div`
	text-decoration: underline;
	color: ${Colors.DODGER_BLUE};
	cursor: pointer;
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

export const Dropbox = styled.div`
	text-align: center;
	padding: 20px;
	border: 3px dashed #eeeeee;
	background-color: #fafafa;
	color: #bdbdbd;

	margin-bottom: 20px;

	cursor: pointer;
`;
