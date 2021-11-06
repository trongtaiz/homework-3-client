import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled as mstyled } from "@mui/styles";

export const HeaderWrapper = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
	padding: 12px 24px;
	border-bottom: 0.5px solid #e0e0e0;
	box-shadow: rgb(36 50 66 / 8%) 0px 2px 12px 0px;
	display: flex;
	justify-content: space-between;
`;

export const Input = mstyled(TextField)({
	width: "100%",
	marginBottom: "20px",
});

export const MaterialButton = mstyled(Button)({
	width: "100%",
	backgroundColor: "#3993ff",
	color: "white",
	height: "56px",
	borderRadius: "8px",

	"&:hover": {
		opacity: 0.7,
		backgroundColor: "#3993ff",
		color: "white",
	},

	"&:disabled": {
		opacity: 0.5,
		backgroundColor: "#3993ff",
		color: "white",
	},
});
