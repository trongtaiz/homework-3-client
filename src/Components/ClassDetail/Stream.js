import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import "./Class.css";
import Post from "./Post";
import { connect } from "react-redux";
import { getAllPostsInClass } from "../../Redux/actions/posts";

function Stream(props) {
	useEffect(() => {
		props.getAllPostsInClass(props.id);
	}, []);
	const { posts } = props;
	return (
		<div className="class">
			<div
				className="class__nameBox"
				style={{ backgroundImage: "url(/background.png)" }}
			>
				<div className="class__name">{props.name}</div>
			</div>
			<div className="class__post">
				<img
					src={
						"https://lh3.googleusercontent.com/a/default-user=s40-c"
					}
					alt=""
				/>
				<input
					type="text"
					placeholder="Announce something to your class"
				/>
				<IconButton>
					<SendOutlined />
				</IconButton>
			</div>
			{posts?.map((post) => (
				// eslint-disable-next-line react/jsx-key
				<Post
					authorId={post.authorId}
					content={post.content}
					date={post.date.substr(0, 10)}
					image={
						post.image
							? post.image
							: "https://lh3.googleusercontent.com/a/default-user=s40-c"
					}
					name={post.name}
				/>
			))}
		</div>
	);
}

const mapStateToProps = (state) => {
	return state.posts;
};

export default connect(mapStateToProps, { getAllPostsInClass })(Stream);
