import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InviteLinkModal from "Components/InviteLinkModal";
import InviteEmailModal from "Components/InviteEmailModal";
import UploadFileModal from "Components/UploadFileModal";
import MappingAccountIDModel from "./MappingAccountIDModel";
import { Toolbar } from "@mui/material";

import { tabsOnRole } from "Utils/constants";

function LinkTab(props) {
	return <Tab component={Link} {...props} />;
}

function ClassHeader(props) {
	const [inviteMenuAnchorEl, setInviteMenuAnchorEl] = useState(null);
	const { navTag, name, role } = props;
	const history = useHistory();
	const [openIdUpdate, setOpenIdUpdate] = useState(false);
	const [isOpenInviteLink, setIsOpenInviteLink] = useState(false);
	const [isOpenInviteEmail, setIsOpenInviteEmail] = useState(false);
	const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);

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

	const handleUploadModal = () => {
		setIsOpenUploadFileModal(true);
	};

	const redirectHome = (e) => {
		e.preventDefault();
		history.push("/");
	};

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
					<div>
						{role === "TEACHER" ? (
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
					</div>
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
			<MappingAccountIDModel
				open={openIdUpdate}
				setOpenIdUpdate={setOpenIdUpdate}
			/>
			<UploadFileModal
				open={isOpenUploadFileModal}
				setIsOpen={setIsOpenUploadFileModal}
			/>
		</Box>
	);
}

export default ClassHeader;
