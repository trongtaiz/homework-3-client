/* eslint-disable no-undef */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AddClassModal from "Components/AddClassModal";
import SignInOrSignUpModal from "Components/SignInOrSignUpModal";
import ForgotPasswordModal from "Components/ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "Redux/actions/auth";
import { RouterURL } from "Utils/constants";
import JoinByCodeModal from "Components/JoinByCodeModal";

const propTypes = {
	isDrawerOpen: PropTypes.bool,
	setIsDrawerOpen: PropTypes.func,
};

const defaultProps = {
	isDrawerOpen: false,
	setIsDrawerOpen: () => {},
};

function AppHeader(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [classMenuAnchorEl, setClassMenuAnchorEl] = React.useState(null);
	const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState(null);
	const { isDrawerOpen, setIsDrawerOpen } = props;
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [isOpenSignInOrSignUpModal, setIsOpenSignInOrSignUpModal] =
		useState(false);
	const [isOpenJoinByCodeModal, setIsOpenJoinByCodeModal] = useState(false);
	const [isOpenForgotPasswordModal, setIsOpenForgotPasswordModal] =
		useState(false);
	const [isSignUpModal, setIsSignUpModal] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handleClassMenu = (event) => {
		setClassMenuAnchorEl(event.currentTarget);
	};

	const handleAccountMenu = (event) => {
		setAccountMenuAnchorEl(event.currentTarget);
	};

	const handleCloseClassMenu = () => {
		setClassMenuAnchorEl(null);
	};

	const handleCloseAccountMenu = () => {
		setAccountMenuAnchorEl(null);
	};

	const openAddModal = () => {
		setIsOpenAddModal(true);
		handleCloseClassMenu();
	};

	const openJoinByCodeModal = () => {
		setIsOpenJoinByCodeModal(true);
		handleCloseClassMenu();
	};

	const openSignInModal = () => {
		setIsSignUpModal(false);
		setIsOpenSignInOrSignUpModal(true);
	};

	const openSignUpModal = () => {
		setIsSignUpModal(true);
		setIsOpenSignInOrSignUpModal(true);
	};

	const closeSignInOrSignUpModal = () => {
		setIsOpenSignInOrSignUpModal(false);
	};

	const closeJoinByCodeModal = () => {
		setIsOpenJoinByCodeModal(false);
	};

	const closeForgotPasswordModal = () => {
		setIsOpenForgotPasswordModal(false);
	};

	const openForgotPasswordModal = () => {
		setIsOpenForgotPasswordModal(true);
	};

	const onLogOut = () => {
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
		dispatch(logout());
	};

	const redirectHome = (e) => {
		e.preventDefault();
		history.push("/");
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar color="primary" position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setIsDrawerOpen(!isDrawerOpen)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						onClick={redirectHome}
						sx={{ flexGrow: 1, cursor: "pointer" }}
					>
						Classroom
					</Typography>

					<div>
						{!user ? (
							<>
								<Button
									variant="outlined"
									color="secondary"
									sx={{ marginRight: "15px" }}
									onClick={openSignUpModal}
								>
									Sign up
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									onClick={openSignInModal}
								>
									Sign in
								</Button>
							</>
						) : (
							<>
								<IconButton
									color="inherit"
									onClick={handleClassMenu}
								>
									<AddIcon />
								</IconButton>
								<IconButton
									color="inherit"
									onClick={handleAccountMenu}
								>
									<AccountCircle />
								</IconButton>
								<Menu
									anchorEl={classMenuAnchorEl}
									open={Boolean(classMenuAnchorEl)}
									onClose={handleCloseClassMenu}
								>
									<MenuItem onClick={openAddModal}>
										Create a class
									</MenuItem>
									<MenuItem onClick={openJoinByCodeModal}>
										Join Class By Code
									</MenuItem>
								</Menu>
								<Menu
									anchorEl={accountMenuAnchorEl}
									open={Boolean(accountMenuAnchorEl)}
									onClose={handleCloseAccountMenu}
								>
									<MenuItem
										onClick={(e) => {
											e.preventDefault();
											history.push(RouterURL.PROFILE);
										}}
									>
										Profile
									</MenuItem>
									<MenuItem onClick={onLogOut}>
										Log out
									</MenuItem>
								</Menu>
							</>
						)}
					</div>
				</Toolbar>
			</AppBar>
			<AddClassModal
				isOpenAddModal={isOpenAddModal}
				setIsOpenAddModal={setIsOpenAddModal}
			/>
			<SignInOrSignUpModal
				isOpen={isOpenSignInOrSignUpModal}
				onClose={closeSignInOrSignUpModal}
				isSignUpModal={isSignUpModal}
				setIsSignUpModal={setIsSignUpModal}
				openForgotPasswordModal={openForgotPasswordModal}
			/>
			<ForgotPasswordModal
				isOpenModal={isOpenForgotPasswordModal}
				setIsOpenModal={setIsOpenForgotPasswordModal}
				onClose={closeForgotPasswordModal}
			/>
			<JoinByCodeModal
				isOpenModal={isOpenJoinByCodeModal}
				setIsOpenModal={setIsOpenJoinByCodeModal}
				onClose={closeJoinByCodeModal}
			></JoinByCodeModal>
		</Box>
	);
}

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;

export default AppHeader;
