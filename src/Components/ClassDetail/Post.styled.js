import styled from "styled-components";

export const PostWrapper = styled.div`
	width: 100%;
	padding: 25px;
	border-radius: 10px;
	border: 1px solid #adadad;
	margin-bottom: 20px;
`;

export const PostInformationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const PostInfoSection = styled.div`
	display: flex;
	align-items: center;
`;

export const PostNameAndDate = styled.div`
	margin-left: 10px;
`;

export const PostName = styled.div`
	font-weight: 600;
`;

export const PostDate = styled.div`
	color: #424242;
	font-size: 14px;
	margin-top: 2px;
`;

export const PostImageContainer = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 9999px;
`;

export const PostContent = styled.div`
	margin-top: 15px;
`;
