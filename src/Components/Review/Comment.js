import React from "react";
import { makeStyles } from "@mui/styles";
import {
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
	fonts: {
		fontWeight: "bold",
	},
	inline: {
		display: "inline",
	},
}));

const Comment = ({ name, content }) => {
	const classes = useStyles();
	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt="avatar" src={"/avatar.png"} />
			</ListItemAvatar>
			<ListItemText
				primary={
					<Typography className={classes.fonts}>{name}</Typography>
				}
				secondary={content}
			/>
		</ListItem>
	);
};

export default Comment;
