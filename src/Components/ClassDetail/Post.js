import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";
import {
	PostContent,
	PostDate,
	PostImageContainer,
	PostInformationContainer,
	PostInfoSection,
	PostName,
	PostNameAndDate,
	PostWrapper,
} from "./Post.styled";

function Post({ image, name, date, content }) {
	return (
		<PostWrapper>
			<PostInformationContainer>
				<PostInfoSection>
					<PostImageContainer src={image} alt="Profile photo" />
					<PostNameAndDate>
						<PostName>{name}</PostName>
						<PostDate>{date}</PostDate>
					</PostNameAndDate>
				</PostInfoSection>
				<PostInfoSection>
					<IconButton>
						<MoreVert />
					</IconButton>
				</PostInfoSection>
			</PostInformationContainer>
			<PostContent>{content}</PostContent>
		</PostWrapper>
	);
}

export default Post;
