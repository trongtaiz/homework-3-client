import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React from "react";
import "./Post.css";

function Post({ image, name, date, content }) {
	return (
		<div className="post">
			<div className="post__informationContainer">
				<div className="post__infoSection">
					<div className="post__imageContainer">
						<img src={image} alt="Profile photo" />
					</div>
					<div className="post__nameAndDate">
						<div className="post__name">{name}</div>
						<div className="post__date">{date}</div>
					</div>
				</div>
				<div className="post__infoSection">
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="post__content">{content}</div>
		</div>
	);
}

export default Post;
