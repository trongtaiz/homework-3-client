import styled from "styled-components";

export const ClassDetailWrapper = styled.div`
	width: 75%;
	margin: auto;
`;

export const ClassNameBox = styled.div`
	width: 100%;
	background-size: cover;
	background-image: url("/background.png");
	color: white;
	height: 200px;
	margin-top: 30px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 30px;
	font-weight: bold;
	font-size: 43px;
`;

export const ClassPost = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 20px;
	margin-bottom: 25px;
	box-shadow: 0px 1px 6px -2px black;
	justify-content: space-between;
	border-radius: 15px;
	margin-top: 20px;
`;

export const PostAvatar = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 9999px;
`;

export const InputPost = styled.input`
	border: none;
	padding: 15px 20px;
	width: 100%;
	margin-left: 20px;
	margin-right: 20px;
	font-size: 17px;
	outline: none;
`;
