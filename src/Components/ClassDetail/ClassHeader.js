import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Tabs } from "@material-ui/core";
import MappingAccountIDModel from "./MappingAccountIDModel";
import AddIcon from "@mui/icons-material/Add";
import AddLinkIcon from "@mui/icons-material/AddLink";

function LinkTab(props) {
	return <Tab component="a" {...props} />;
}

function ClassHeader(props) {
	const { navTag, name } = props;
	const [openIdUpdate, setOpenIdUpdate] = React.useState(false);

	const openUpdateIdModal = () => {
		setOpenIdUpdate(true);
	};
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar color="primary" position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div">
							{name}
						</Typography>
						<Box sx={{ flexGrow: 1 }}>
							<Tabs
								value={navTag}
								textColor="secondary"
								indicatorColor="secondary"
								aria-label="nav tabs example"
								centered
							>
								<LinkTab label="Stream" href={`stream`} />
								<LinkTab label="Classwork" href="/" />
								<LinkTab label="People" href={`people`} />
							</Tabs>
						</Box>
						<div>
							<IconButton color="inherit">
								<AddLinkIcon />
							</IconButton>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								onClick={openUpdateIdModal}
							>
								<AccountCircle />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
			</Box>

			<MappingAccountIDModel
				open={openIdUpdate}
				setOpenIdUpdate={setOpenIdUpdate}
			/>
		</>
	);
}

export default ClassHeader;
