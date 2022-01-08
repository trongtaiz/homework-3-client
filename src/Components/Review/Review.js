import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as reviewService from "Services/review.service";
import {
	Box,
	Typography,
	Grid,
	CardContent,
	Card,
	CardActionArea,
	Button,
	CardActions,
	TextField,
	Divider,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Comment from "./Comment";

export default function Review({ review }) {
	const { user } = useSelector((state) => state.auth);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);
	const [participants, setParticipants] = useState([]);

	const commentHandler = (e) => {
		setNewComment(e.target.value);
	};
	const postComment = () => {
		reviewService.postComment({
			reviewId: review.id,
			content: newComment,
		});
		setComments([
			...comments,
			{ content: newComment, author: participants[user.id].name },
		]);
		setNewComment("");
	};

	useEffect(async () => {
		const { data } = await reviewService.getAllCommentsOfReview(review.id);
		setComments(data.data.comments);
		setParticipants(data.data.participants);
	}, [review]);

	useEffect(async () => {
		if (comments.length > 0 && participants) {
			const newComments = comments.map((comment) => ({
				...comment,
				author: participants[comment.from].name,
			}));
			setComments(newComments);
		}
	}, [participants]);
	return (
		<>
			<Grid sx={{ mt: 5 }} container spacing={3}>
				<Grid item xs={10}>
					<Box>
						<Card elevation={4}>
							<CardActionArea>
								<CardContent>
									<Typography
										gutterBottom
										variant="h4"
										component="div"
										color={"primary"}
										sx={{ m: 1 }}
									>
										{
											review.assignmentOfStudent.detail
												.title
										}
									</Typography>
									<Divider color="primary"></Divider>
									<Box
										sx={{
											alignItems: "center",
											justifyContent: "space-between",
											display: "flex",
											flexDirection: "row",
											p: 1,
											m: 1,
											bgcolor: "background.paper",
										}}
									>
										<Typography
											variant="button"
											display="block"
											color="primary"
										>
											Achieved Point
										</Typography>
										<Button
											sx={{ m: 2 }}
											variant="contained"
											color="error"
											size="small"
										>
											{
												review.assignmentOfStudent
													.achievedPoint
											}
										</Button>

										<Typography
											variant="button"
											display="block"
											gutterBottom
											color="primary"
										>
											Expected Point
										</Typography>
										<Button
											sx={{ m: 2 }}
											variant="contained"
											color="success"
											size="small"
										>
											{review.expectedGrade}
										</Button>
										<Typography
											variant="button"
											display="block"
											gutterBottom
											color="primary"
										>
											Final Point
										</Typography>
										<Button
											sx={{ m: 2 }}
											variant="contained"
											color="info"
											size="small"
										>
											{review.finalGrade ? (
												review.finalGrade
											) : (
												<AutorenewIcon></AutorenewIcon>
											)}
										</Button>
									</Box>
									<Divider></Divider>
									<Typography
										color={"primary"}
										sx={{ m: 1 }}
										gutterBottom
										variant="h6"
										component="div"
									>
										Explanation
									</Typography>
									<Typography
										sx={{ m: 1 }}
										gutterBottom
										variant="subtitle2"
										component="div"
									>
										{review.explanation}
									</Typography>
									<Divider></Divider>

									<Typography
										color={"primary"}
										sx={{ m: 1 }}
										gutterBottom
										variant="h6"
										component="div"
									>
										Comments
									</Typography>
									{comments?.map((comment, i) => (
										<>
											<Divider></Divider>
											<Comment
												key={i}
												content={comment.content}
												name={comment.author}
											></Comment>
										</>
									))}
								</CardContent>
							</CardActionArea>
							<CardActions>
								<TextField
									sx={{ m: 1 }}
									fullWidth
									multiline
									label="Add a comment"
									variant="outlined"
									value={newComment}
									onChange={commentHandler}
								/>
								<Button
									variant="contained"
									size="small"
									color="primary"
									onClick={postComment}
								>
									Comment
								</Button>
							</CardActions>
						</Card>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
