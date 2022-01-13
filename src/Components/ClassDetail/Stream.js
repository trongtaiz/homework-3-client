import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Post from "./Post";
import { Role } from "Utils/constants";
import { connect } from "react-redux";
import { getAllPostsInClass } from "../../Redux/actions/posts";
import {
	ClassDetailWrapper,
	ClassNameBox,
	InputPost,
	PostAvatar,
} from "./ClassDetail.styled";
import InviteCodeModal from "Components/InviteCodeModal";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: "20px",
	elevation: "5",
	borderRadius: "9px",
	display: "flex",
}));

function Stream(props) {
	const [isInviteCodeModalOpen, setIsInviteCodeModalOpen] = useState(false);
	const { role: role } = useSelector((state) => state.currentClass);
	const { class: currentClass } = useSelector((state) => state.currentClass);
	const { id, invite_id } = currentClass;
	const linkJoin = `${window.location.origin}/join-class?classId=${id}&inviteId=${invite_id}`;

	useEffect(() => {
		props.getAllPostsInClass(props.id);
	}, []);
	const { posts, name } = props;
	return (
		<ClassDetailWrapper>
			<ClassNameBox>
				<div className="class__name">{name}</div>
			</ClassNameBox>
			<Box sx={{ flexGrow: 1, mt: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={4} md={3} lg={2}>
						<Item elevation={4}>
							<div>
								<Typography variant="subtitle2">
									{role === Role.TEACHER
										? "Code Class"
										: "Deadline"}
								</Typography>
								{role === Role.TEACHER ? (
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<Typography
											variant="body1"
											color={"primary"}
										>
											{invite_id.substr(0, 7)}
										</Typography>

										<IconButton
											onClick={() =>
												setIsInviteCodeModalOpen(true)
											}
										>
											<FullscreenIcon color="primary" />
										</IconButton>
									</Box>
								) : (
									<Typography variant="caption">
										No incoming deadline
									</Typography>
								)}
							</div>
						</Item>
					</Grid>
					<Grid item xs={8} md={9} lg={10}>
						<Item elevation={4}>
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
						</Item>
					</Grid>
				</Grid>
			</Box>

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
			<InviteCodeModal
				code={invite_id?.substr(0, 7)}
				name={name}
				onClose={() => setIsInviteCodeModalOpen(false)}
				isOpen={isInviteCodeModalOpen}
				inviteLink={linkJoin}
			></InviteCodeModal>
		</ClassDetailWrapper>
	);
}

const mapStateToProps = (state) => {
	return {
		post: state.posts,
		name: state.currentClass.class.name,
	};
};

export default connect(mapStateToProps, { getAllPostsInClass })(Stream);
