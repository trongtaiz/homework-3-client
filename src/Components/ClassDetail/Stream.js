import { IconButton } from "@material-ui/core";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import React from "react";
import { useEffect } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { getAllPostsInClass } from "../../Redux/actions/posts";
import {
	ClassDetailWrapper,
	ClassNameBox,
	ClassPost,
	InputPost,
	PostAvatar,
} from "./ClassDetail.styled";

function Stream(props) {
	useEffect(() => {
		props.getAllPostsInClass(props.id);
	}, []);
	const { posts } = props;
	return (
		<ClassDetailWrapper>
			<ClassNameBox>
				<div className="class__name">{props.name}</div>
			</ClassNameBox>
			<ClassPost>
				<PostAvatar
					src={
						"https://lh3.googleusercontent.com/a/default-user=s40-c"
					}
				/>
				<InputPost
					type="text"
					placeholder="Announce something to your class"
				/>
				<IconButton>
					<SendOutlinedIcon />
				</IconButton>
			</ClassPost>
			{posts?.map((post) => (
				<Post
					key={post.id}
					authorId={post.authorId}
					content={post.content}
					date={post.date.substr(0, 10)}
					image={post.image ? post.image : "/avatar.png"}
					name={post.name}
				/>
			))}
		</ClassDetailWrapper>
	);
}

const mapStateToProps = (state) => {
	return state.posts;
};

export default connect(mapStateToProps, { getAllPostsInClass })(Stream);
