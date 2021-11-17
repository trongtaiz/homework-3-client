import React from "react";

import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";
import { CardActionArea, CardActions, Divider } from "@mui/material";

import * as Styled from "./Class.styled";

function Class(props) {
	const { name, id } = props;
	return (
		<Styled.MyCard>
			<Styled.Link to={`/classes/${id}/stream`}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image="http://cdn30.us1.fansshare.com/image/wallpaperdesktop/computer-theme-light-blue-wallpaper-hd-computer-background-full-size-137737072.jpg"
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{name}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Styled.Link>
			<Divider />
			<CardActions>
				<IconButton>
					<DescriptionIcon />
				</IconButton>
			</CardActions>
		</Styled.MyCard>
	);
}

export default Class;
