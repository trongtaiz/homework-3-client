import styled from "styled-components";
import { Colors } from "Utils/constants";

export const PageWrapper = styled.div`
	width: 100%;
	padding: 25px;
	border-radius: 10px;
	border: 1px solid #adadad;
	margin-bottom: 20px;
`;

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	background-color: ${Colors.LIGHT_WHITE};
	height: 100vh;
`;
