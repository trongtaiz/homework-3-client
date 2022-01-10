import React, { useState } from "react";
import PropTypes from "prop-types";

import UserTable from "Components/UserTable";
import ClassTable from "Components/ClassTable";
import AdminTable from "Components/AdminTable";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import * as Styled from "./AdminDashboard.styled";

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
					<div>{children}</div>
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

function AdminDashboard() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Styled.Wrapper>
			{/* <Typography variant="h4" sx={{ marginLeft: "11.5%" }}>
				Admin Dashboard
			</Typography> */}

			<Styled.Container>
				<Tabs
					orientation="vertical"
					value={value}
					onChange={handleChange}
					sx={{
						borderRight: 1,
						borderColor: "divider",
						width: "10%",
					}}
				>
					<Tab label="Admin management" {...a11yProps(0)} />
					<Tab label="User management" {...a11yProps(1)} />
					<Tab label="Class management" {...a11yProps(2)} />
				</Tabs>
				<div style={{ width: "90%" }}>
					<div>
						<TabPanel value={value} index={0}>
							<AdminTable />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<UserTable />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<ClassTable />
						</TabPanel>
					</div>
				</div>
			</Styled.Container>
		</Styled.Wrapper>
	);
}

export default AdminDashboard;
