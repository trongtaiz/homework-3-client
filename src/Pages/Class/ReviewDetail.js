import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Review from "Components/Review/Review";

import * as reviewService from "Services/review.service";
import * as classService from "Services/class.service";
import ClassHeader from "Components/ClassDetail/ClassHeader";

function ReviewDetail() {
	const { classId, reviewId } = useParams();
	const [review, setReview] = useState();
	const [role, setRole] = useState();
	const { user } = useSelector((state) => state.auth);
	const { class: currentClass } = useSelector((state) => state.currentClass);

	useEffect(async () => {
		if (user?.id) {
			const { data } = await reviewService.getReviewDetail(reviewId);
			const { curRole } = await classService.getRole(classId, user.id);
			console.log("data", data, curRole);
			setReview(data.data);
			setRole(curRole);
		}
	}, [user]);
	return (
		<div>
			<ClassHeader
				hasNav={false}
				classId={currentClass.id}
				name={currentClass.name}
				role={role}
			/>
			{review && <Review review={review}></Review>}
		</div>
	);
}
export default ReviewDetail;
