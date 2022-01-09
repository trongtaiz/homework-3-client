import React, { useEffect } from "react";
import * as Styled from "./Profile.styled";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { authRequest } from "Utils/request";
import { useDispatch } from "react-redux";
import { updateUser } from "Redux/actions/auth";

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography component={"div"}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const validationSchema = Yup.object().shape({
	name: Yup.string().trim().required("Name is required").min(3),
});

const Profile = () => {
	const [tabValue, setTabValue] = React.useState(0);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const [updateResult, setUpdateResult] = React.useState({
		color: "red",
		text: "",
	});

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const { handleSubmit, register, setValue, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		if (user) setValue("name", user.name);
	}, [user]);

	const handleUpdate = async ({ name }) => {
		await authRequest
			.put("/users", { name })
			.catch(() =>
				setUpdateResult({ color: "red", text: "Update failed" })
			);

		setUpdateResult({ color: "green", text: "Successfully updated" });
		dispatch(updateUser({ user: { ...user, name } }));
	};

	return (
		<Styled.Wrapper>
			<Styled.Container>
				<Tabs
					value={tabValue}
					onChange={handleChange}
					aria-label="basic tabs example"
					orientation="vertical"
					sx={{}}
				>
					<Tab label="Edit Profile" {...a11yProps(0)} />
					<Tab label="Change password" {...a11yProps(1)} />
				</Tabs>
				<div style={{ flexGrow: 1 }}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TabPanel value={tabValue} index={0}>
							<div
								style={{
									textAlign: "center",
									color: updateResult.color,
								}}
							>
								{updateResult.text}
							</div>
							<form onSubmit={handleSubmit(handleUpdate)}>
								<div
									style={{
										marginBottom: "50px",
										marginTop: "50px",
									}}
								>
									<Typography variant="span">
										Email
									</Typography>
									<TextField
										fullWidth
										variant="outlined"
										type="text"
										margin="dense"
										id="email"
										InputProps={{
											readOnly: true,
										}}
										value={user?.email || ""}
										sx={{
											marginBottom: "20px",
											// width: "100%",
										}}
									/>
									<Typography variant="span">Name</Typography>
									<TextField
										fullWidth
										variant="outlined"
										type="text"
										margin="dense"
										id="name"
										error={!!formState.errors.name?.message}
										helperText={
											formState.errors.name?.message
										}
										{...register("name")}
									/>
								</div>
								<div style={{ textAlign: "center" }}>
									<Button variant="outlined" type="submit">
										Update
									</Button>
								</div>
							</form>
						</TabPanel>
						<TabPanel value={tabValue} index={1}>
							Change password
						</TabPanel>
					</div>
				</div>
			</Styled.Container>
		</Styled.Wrapper>
	);
};

export default Profile;
