import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StudentGradeBoard from "./GradeBoardOfStudent";
import ReviewTabOfStudent from "../Review/ReviewTabOfStudent";

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

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}

export default function GradeTabOfStudent() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
					<Tab label="Grade Board" {...a11yProps(0)} />
					<Tab label="Requested Review" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<Box gridColumn="span 9">
				<TabPanel value={value} index={0}>
					<StudentGradeBoard></StudentGradeBoard>
				</TabPanel>

				<TabPanel value={value} index={1}>
					<ReviewTabOfStudent></ReviewTabOfStudent>
				</TabPanel>
			</Box>
		</Box>
	);
}
