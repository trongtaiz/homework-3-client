import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tabs from "@mui/material/Tabs";
import AddLinkIcon from "@mui/icons-material/AddLink";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import InviteLinkModal from "Components/InviteLinkModal";
import InviteEmailModal from "Components/InviteEmailModal";
import UploadFileModal from "Components/UploadFileModal";
import MappingAccountIDModal from "./MappingAccountIDModal";
import NotificationItem from "Components/Notification/NotificationItem";
import { Role } from "Utils/constants";
import {
	getAllNotificationsInClass,
	getClassDetail,
	getRole,
} from "Redux/actions/classes";

import { Toolbar } from "@mui/material";

import { RouterURL, tabsOnRole } from "Utils/constants";

function LinkTab(props) {
	return <Tab component={Link} {...props} />;
}

function ClassHeader({ navTag, hasNav }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { classId } = useParams();
	const refreshToken = localStorage.getItem("refreshToken");
	const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] =
		React.useState(null);
	const [openIdUpdate, setOpenIdUpdate] = useState(false);
	const [isOpenInviteLink, setIsOpenInviteLink] = useState(false);
	const [isOpenInviteEmail, setIsOpenInviteEmail] = useState(false);
	const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);
	const [inviteMenuAnchorEl, setInviteMenuAnchorEl] = useState(null);

	const { user } = useSelector((state) => state.auth);
	const {
		class: currentClass,
		role: role,
		notifications: notifications,
	} = useSelector((state) => state.currentClass);

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

	const handleNotificationMenu = (event) => {
		setNotificationMenuAnchorEl(event.currentTarget);
	};

	const handleCloseInviteMenu = () => {
		setInviteMenuAnchorEl(null);
	};

	const handleCloseNotificationMenu = () => {
		setNotificationMenuAnchorEl(null);
	};

	const handleInviteMenu = (event) => {
		setInviteMenuAnchorEl(event.currentTarget);
	};

	const handleUploadModal = () => {
		setIsOpenUploadFileModal(true);
	};

	const redirectHome = (e) => {
		e.preventDefault();
		history.push("/");
	};

	useEffect(() => {
		if (!refreshToken) {
			history.push(RouterURL.HOME);
			return;
		}
		dispatch(getClassDetail(classId));
	}, []);

	useEffect(() => {
		dispatch(getAllNotificationsInClass(classId, user?.id));
		dispatch(getRole(classId, user?.id));
	}, [user]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar color="primary" position="static" elevation={2}>
				<Toolbar>
					<IconButton
						color="inherit"
						sx={{ mr: 2 }}
						onClick={redirectHome}
					>
						<HomeIcon />
					</IconButton>
					<Typography
						component={Link}
						variant="h6"
						color="inherit"
						to={"/classes/" + currentClass.id + "/stream"}
						noWrap
						style={{ textDecoration: "none" }}
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						{currentClass.name}
					</Typography>
					{hasNav ? (
						<Tabs
							sx={{ flexGrow: 1 }}
							value={navTag}
							textColor="secondary"
							indicatorColor="secondary"
							centered
						>
							{tabsOnRole[role]?.map((eachTab) => (
								<LinkTab
									key={eachTab.to}
									label={eachTab.label}
									to={eachTab.to}
								/>
							))}
						</Tabs>
					) : (
						<Box sx={{ flexGrow: 1 }} />
					)}

					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							color="inherit"
							onClick={handleNotificationMenu}
						>
							<Badge
								badgeContent={
									notifications.filter(
										(i) => i.seen === false
									).length
								}
								color="warning"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						{role === Role.TEACHER ? (
							<>
								<IconButton
									onClick={handleUploadModal}
									color="inherit"
								>
									<FileUploadIcon />
								</IconButton>
								<IconButton
									onClick={handleInviteMenu}
									color="inherit"
								>
									<AddLinkIcon />
								</IconButton>
								<Menu
									anchorEl={inviteMenuAnchorEl}
									open={!!inviteMenuAnchorEl}
									onClose={handleCloseInviteMenu}
								>
									<MenuItem onClick={openInviteEmailModal}>
										Invite By Email
									</MenuItem>
									<MenuItem onClick={openInviteModal}>
										Invite By link
									</MenuItem>
								</Menu>
							</>
						) : (
							<IconButton
								color="inherit"
								onClick={openUpdateIdModal}
							>
								<AccountCircle />
							</IconButton>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<InviteLinkModal
				isOpenModal={isOpenInviteLink}
				setIsOpenModal={setIsOpenInviteLink}
			/>
			<InviteEmailModal
				isOpenModal={isOpenInviteEmail}
				setIsOpenModal={setIsOpenInviteEmail}
			/>
			{role === Role.STUDENT && (
				<MappingAccountIDModal
					open={openIdUpdate}
					setOpenIdUpdate={setOpenIdUpdate}
				/>
			)}
			<UploadFileModal
				open={isOpenUploadFileModal}
				setIsOpen={setIsOpenUploadFileModal}
			/>
			<Menu
				anchorEl={notificationMenuAnchorEl}
				open={Boolean(notificationMenuAnchorEl)}
				onClose={handleCloseNotificationMenu}
			>
				<List
					sx={{
						width: "100%",
						maxWidth: 360,
						bgcolor: "background.paper",
					}}
				>
					{notifications?.map((item, i) => (
						<div key={i}>
							<NotificationItem
								message={item.message}
								subject={item.subject}
								seen={item.seen}
								link={item.link}
								id={item.id}
							></NotificationItem>
							<Divider variant="inset" component="li" />
						</div>
					))}
				</List>
			</Menu>
		</Box>
	);
}

export default ClassHeader;
