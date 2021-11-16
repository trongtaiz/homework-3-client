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
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
						<MoreVertIcon />
					</IconButton>
				</PostInfoSection>
			</PostInformationContainer>
			<PostContent>{content}</PostContent>
		</PostWrapper>
	);
}

export default Post;
