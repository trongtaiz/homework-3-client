import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as reviewService from "Services/review.service";
import {
	Box,
	Typography,
	CardContent,
	Card,
	CardActionArea,
	Button,
	CardActions,
	TextField,
	Divider,
} from "@mui/material";
import { Role } from "Utils/constants";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Comment from "./Comment";

export default function Review({ review }) {
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);
	const [participants, setParticipants] = useState([]);
	const [finalGrade, setFinalGrade] = useState("");
	const [isValidGrade, setIsValidGrade] = useState(true);
	const [isFinalized, setIsFinalized] = useState(review.finalGrade !== null);
	const { user } = useSelector((state) => state.auth);
	const { role: role, class: currentClass } = useSelector(
		(state) => state.currentClass
	);

	const commentHandler = (e) => {
		setNewComment(e.target.value);
	};
	const gradeHandler = (e) => {
		const grade = parseFloat(e.target.value);
		setIsValidGrade(0 < grade && grade <= 10);
		setFinalGrade(e.target.value);
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
	const finalizeReview = async () => {
		if (isValidGrade) {
			const res = await reviewService.finalizeReview(
				review.id,
				parseFloat(finalGrade)
			);
			if (res.status == 201) setIsFinalized(true);
		} else setIsValidGrade(false);
	};

	useEffect(async () => {
		setIsFinalized(review.finalGrade !== null);
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
			<Box
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
				}}
				sx={{ mt: 5, mb: 5 }}
			>
				<Card
					style={{
						width: "90%",
					}}
					elevation={4}
				>
					<CardActionArea
						component={Link}
						to={`/classes/${currentClass.id}/review-detail/${review.id}`}
					>
						<CardContent>
							<Typography
								gutterBottom
								variant="h4"
								component="div"
								color={"primary"}
								sx={{ m: 1 }}
							>
								{review.assignmentOfStudent.detail.title}
							</Typography>
							{role === Role.TEACHER && (
								<Typography
									gutterBottom
									variant="subtitle1"
									component="div"
									color={"primary"}
									sx={{ m: 1 }}
								>
									{`Requested by ${review.studentId} - ${review.assignmentOfStudent.student.fullName} `}
								</Typography>
							)}
						</CardContent>
					</CardActionArea>

					<CardContent>
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
								{review.prevGrade
									? review.prevGrade
									: review.assignmentOfStudent.achievedPoint}
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

							{role === Role.TEACHER && isFinalized == false ? (
								<>
									{isValidGrade ? (
										<TextField
											label="Final Point"
											variant="filled"
											color="success"
											size="small"
											value={finalGrade}
											onChange={gradeHandler}
											sx={{ m: 2, width: 100 }}
											focused
											type="number"
											inputProps={{ pattern: "[0-9]" }}
										/>
									) : (
										<TextField
											error
											label="Final Point"
											variant="filled"
											color="success"
											size="small"
											value={finalGrade}
											onChange={gradeHandler}
											sx={{ m: 2, width: 100 }}
											focused
											type="number"
											inputProps={{ pattern: "[0-9]" }}
											helperText="Invalid Point"
										/>
									)}

									<Button
										sx={{ m: 2 }}
										variant="contained"
										color="info"
										size="small"
										onClick={finalizeReview}
									>
										Finalize
									</Button>
								</>
							) : (
								<>
									{" "}
									<Typography
										variant="button"
										display="block"
										gutterBottom
										color="primary"
									>
										Final Point
									</Typography>{" "}
									<Button
										sx={{ m: 2 }}
										variant="contained"
										color="info"
										size="small"
									>
										{isFinalized ? (
											review.finalGrade ? (
												review.finalGrade
											) : (
												finalGrade
											)
										) : (
											<AutorenewIcon></AutorenewIcon>
										)}
									</Button>
								</>
							)}
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
							<div key={i}>
								<Divider></Divider>
								<Comment
									content={comment.content}
									name={comment.author}
								></Comment>
							</div>
						))}
					</CardContent>
					{!isFinalized && (
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
					)}
				</Card>
			</Box>
		</>
	);
}
