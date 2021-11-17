import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tab from "@mui/material/Tab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tabs from "@mui/material/Tabs";
import AddLinkIcon from "@mui/icons-material/AddLink";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import InviteLinkModal from "Components/InviteLinkModal";
import InviteEmailModal from "Components/InviteEmailModal";
import MappingAccountIDModel from "./MappingAccountIDModel";

function LinkTab(props) {
	return <Tab component={Link} {...props} />;
}

function ClassHeader(props) {
	const [inviteMenuAnchorEl, setInviteMenuAnchorEl] = React.useState(null);
	const { navTag, name, role } = props;
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
								<LinkTab label="Stream" to="stream" />
								<LinkTab label="Classwork" to="/" />
								<LinkTab label="People" to="people" />
							</Tabs>
						</Box>
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
