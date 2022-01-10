import Review from "Components/Review/Review";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as reviewService from "Services/review.service";

export default function ReviewTabOfStudent() {
	const [reviews, setReviews] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const { class: currentClass } = useSelector((state) => state.currentClass);

	useEffect(async () => {
		const { data } = await reviewService.getAllReviewInClassOfStudent(
			user.studentId,
			currentClass.id
		);
		console.log("data", data);
		setReviews(data.data);
	}, []);

	return (
		<div>
			{reviews?.map((review, i) => (
				<Review review={review} key={i}></Review>
			))}
		</div>
	);
}
