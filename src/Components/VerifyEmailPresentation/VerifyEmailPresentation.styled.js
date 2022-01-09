import styled from "styled-components";
import { Colors } from "Utils/constants";

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	background-color: ${Colors.LIGHT_WHITE};
	height: ${(props) =>
		(props.$isFullscreen && "100vh") || `calc(100vh - 64px)`};
`;

export const TextHolder = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	gap: 20px;
	background-color: ${Colors.WHITE};
	box-shadow: rgb(195 210 225 / 65%) 0px 8px 20px 0px;
	border-radius: 16px;
	padding: 32px;
	width: 480px;
	height: 206px;
`;
