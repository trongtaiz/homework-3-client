import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const propTypes = {
	isDrawerOpen: PropTypes.bool,
	setIsDrawerOpen: PropTypes.func,
};

const defaultProps = {
	isDrawerOpen: false,
	setIsDrawerOpen: () => {},
};

export function AppDrawer(props) {
	const { isDrawerOpen, setIsDrawerOpen } = props;

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setIsDrawerOpen(open);
	};

	const list = () => (
		<Box
			sx={{
				width: 250,
			}}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map(
					(text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					)
				)}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			<React.Fragment>
				<Drawer
					anchor="left"
					open={isDrawerOpen}
					onClose={toggleDrawer(false)}
				>
					{list()}
				</Drawer>
			</React.Fragment>
		</div>
	);
}

AppDrawer.propTypes = propTypes;
AppDrawer.defaultProps = defaultProps;

export default AppDrawer;
