import Review from "Components/Review/Review";
import React, { useEffect, useState } from "react";

import * as reviewService from "Services/review.service";
import * as assignmentService from "Services/assignment.service";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index, name) {
	return {
		name: name,
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

export default function ReviewTabOfTeacher({ id }) {
	const [value, setValue] = React.useState(0);
	const [reviews, setReviews] = useState([]);
	const [assignments, setAssignments] = useState([]);

	const handleChange = async (event, newValue) => {
		console.log("newValue", event.target);
		setValue(newValue);
		if (newValue == 0) {
			const { data } = await reviewService.getAllReviewInClass(id);
			setReviews(data.data);
		} else {
			const { data } = await reviewService.getAllReviewOfAssignment(
				event.target.name
			);
			setReviews(data.data);
		}
	};

	useEffect(async () => {
		const { data } = await assignmentService.getAssignments(id);
		console.log("data", data.data);
		setAssignments(data.data);
		// const { all } = await reviewService.getAllReviewInClass(id);
		// console.log("all", all);
		// setReviews(all.data);
	}, []);
	useEffect(async () => {
		const { data } = await reviewService.getAllReviewInClass(id);
		console.log("data", data);
		setReviews(data.data);
	}, [assignments]);

	return (
		<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
			<Box gridColumn="span 3" style={{ paddingTop: "70px" }}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					sx={{ borderRight: 1, borderColor: "divider" }}
				>
					<Tab label="All" {...a11yProps(0, "all")} />

					{assignments?.map((assignments, i) => (
						<Tab
							key={i}
							label={assignments.title}
							{...a11yProps(i + 1, assignments.id)}
						/>
					))}
				</Tabs>
			</Box>
			<Box gridColumn="span 9">
				{reviews.length > 0 ? (
					reviews?.map((review, i) => (
						<Review review={review} key={i}></Review>
					))
				) : (
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						color={"primary"}
						sx={{ m: 1 }}
					>
						No reviews
					</Typography>
				)}
			</Box>
		</Box>
	);
}
