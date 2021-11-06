import React, { useState } from "react";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import AddClassModal from "Components/AddClassModal";

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

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
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
						<IconButton color="inherit" onClick={handleMenu}>
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
					</div>
				</Toolbar>
			</AppBar>
			<AddClassModal
				isOpenAddModal={isOpenAddModal}
				setIsOpenAddModal={setIsOpenAddModal}
			/>
		</Box>
	);
}

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;

export default AppHeader;
