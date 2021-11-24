import React from "react";
import { Link, useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tabs from "@mui/material/Tabs";
import AddLinkIcon from "@mui/icons-material/AddLink";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InviteLinkModal from "Components/InviteLinkModal";
import InviteEmailModal from "Components/InviteEmailModal";
import MappingAccountIDModel from "./MappingAccountIDModel";
import { Toolbar } from "@mui/material";

function LinkTab(props) {
	return <Tab component={Link} {...props} />;
}

function ClassHeader(props) {
	const [inviteMenuAnchorEl, setInviteMenuAnchorEl] = React.useState(null);
	const { navTag, name, role } = props;
	const history = useHistory();
	const [openIdUpdate, setOpenIdUpdate] = React.useState(false);
	const [isOpenInviteLink, setIsOpenInviteLink] = React.useState(false);
	const [isOpenInviteEmail, setIsOpenInviteEmail] = React.useState(false);

	const openUpdateIdModal = () => {
		setOpenIdUpdate(true);
	};

	const openInviteModal = () => {
		setIsOpenInviteLink(true);
		handleCloseInviteMenu();
	};

	const openInviteEmailModal = () => {
		setIsOpenInviteEmail(true);
		handleCloseInviteMenu();
	};

	const handleCloseInviteMenu = () => {
		setInviteMenuAnchorEl(null);
	};

	const handleInviteMenu = (event) => {
		setInviteMenuAnchorEl(event.currentTarget);
	};

	const redirectHome = (e) => {
		e.preventDefault();
		history.push("/");
	};

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar color="primary" position="static" elevation={2}>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="home"
							sx={{ mr: 2 }}
							onClick={redirectHome}
						>
							<HomeIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ cursor: "pointer" }}
						>
							{name}
						</Typography>
						<Tabs
							sx={{ flexGrow: 1 }}
							value={navTag}
							textColor="secondary"
							indicatorColor="secondary"
							aria-label="nav tabs example"
							centered
						>
							<LinkTab label="Stream" to="stream" />
							<LinkTab label="Classwork" to="classwork" />
							<LinkTab label="People" to="people" />
						</Tabs>
						<div>
							{role === "TEACHER" ? (
								<>
									<IconButton
										onClick={handleInviteMenu}
										color="inherit"
									>
										<AddLinkIcon />
									</IconButton>
									<Menu
										id="menu-appbar"
										anchorEl={inviteMenuAnchorEl}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={!!inviteMenuAnchorEl}
										onClose={handleCloseInviteMenu}
									>
										<MenuItem
											onClick={openInviteEmailModal}
										>
											Invite By Email
										</MenuItem>
										<MenuItem onClick={openInviteModal}>
											Invite By link
										</MenuItem>
									</Menu>
								</>
							) : (
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									color="inherit"
									onClick={openUpdateIdModal}
									edge="end"
								>
									<AccountCircle />
								</IconButton>
							)}
						</div>
					</Toolbar>
				</AppBar>
			</Box>
			<InviteLinkModal
				isOpenModal={isOpenInviteLink}
				setIsOpenModal={setIsOpenInviteLink}
			/>
			<InviteEmailModal
				isOpenModal={isOpenInviteEmail}
				setIsOpenModal={setIsOpenInviteEmail}
			/>
			<MappingAccountIDModel
				open={openIdUpdate}
				setOpenIdUpdate={setOpenIdUpdate}
			/>
		</>
	);
}

export default ClassHeader;
