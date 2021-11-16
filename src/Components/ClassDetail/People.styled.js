import styled from "styled-components";

export const PeopleWrapper = styled.div`
	width: 60%;
	margin: auto;
`;
export const PeopleLine = styled.div`
	width: 100%;
	padding-left: 25px;
	padding-bottom: 15px;
	margin-bottom: 15px;
	border-bottom-width: 2px;
	border-bottom-color: white;
	border-bottom-style: solid;
`;
export const PeopleHeader = styled.div`
	width: 100%;
	color: #f8e093;
	height: 100px;
	margin-top: 30px;
	margin-bottom: 30px;
	display: flex;
	flex-direction: row;
	align-items: baseline;
	padding: 30px;
	font-weight: bold;
	font-size: 36px;
	border-bottom-width: 2px;
	border-bottom-color: #f8e093;
	border-bottom-style: solid;
	font-family: SansSerif;
`;

export const PeopleHeaderEnd = styled.div`
	display: flex;
	width: 100%;
	font-size: 16px;
	flex-direction: column;
	align-items: flex-end;
`;
export const PeopleHeaderStart = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
`;
export const PeopleImageContainer = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 9999px;
`;

export const PeopleName = styled.div`
	font-size: 15px;
	margin-left: 30px;
`;

export const PeopleInfoSection = styled.div`
	display: flex;
	align-items: center;
`;
