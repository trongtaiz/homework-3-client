import React from "react";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { updateNotification } from "Redux/actions/classes";
import { Link } from "react-router-dom";

function NotificationItem({ message, id, seen, subject, link }) {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(updateNotification("" + id, true));
	};
	return (
		<ListItemButton
			component={Link}
			to={link}
			alignItems="flex-start"
			onClick={handleClick}
		>
			<ListItemIcon>
				{seen ? (
					<MarkChatReadIcon />
				) : (
					<MarkChatUnreadIcon color="primary" />
				)}
			</ListItemIcon>
			<ListItemText
				primary={subject + id}
				secondary={
					<React.Fragment>
						<Typography
							sx={{
								display: "inline",
							}}
							component="span"
							variant="body2"
							color="text.primary"
						>
							Name
						</Typography>
						{" " + message}
					</React.Fragment>
				}
			/>
		</ListItemButton>
	);
}
export default NotificationItem;
