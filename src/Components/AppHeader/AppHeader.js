import React, { useState } from "react";
import PropTypes from "prop-types";

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
import { useSelector } from "react-redux";

const propTypes = {
	isDrawerOpen: PropTypes.bool,
	setIsDrawerOpen: PropTypes.func,
};

const defaultProps = {
	isDrawerOpen: false,
	setIsDrawerOpen: () => {},
};

function AppHeader(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { isDrawerOpen, setIsDrawerOpen } = props;
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [isOpenSignInOrSignUpModal, setIsOpenSignInOrSignUpModal] =
		useState(false);
	const [isSignUpModal, setIsSignUpModal] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const openAddModal = () => {
		setIsOpenAddModal(true);
		setAnchorEl(null);
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
						sx={{ flexGrow: 1 }}
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
									onClick={handleMenu}
								>
									<AddIcon />
								</IconButton>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>
										Join a class
									</MenuItem>
									<MenuItem onClick={openAddModal}>
										Create a class
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
			/>
		</Box>
	);
}

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;

export default AppHeader;
