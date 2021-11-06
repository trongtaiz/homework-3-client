import React from "react";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import * as Styled from "./AddClassModal.styled";

function AddClassModal(props) {
	const { isOpen, setIsOpen, children, modalName } = props;

	const classes = Styled.CloseIconStyles();
	return (
		<Modal
			keepMounted
			open={isOpen}
			handleClose={() => setIsOpen(false)}
			aria-labelledby="keep-mounted-modal-title"
			aria-describedby="keep-mounted-modal-description"
		>
			<Styled.Wrapper>
				<Styled.Container>
					<Styled.Content>
						<IconButton
							classes={{
								root: classes.root,
							}}
							aria-label="more"
							onClick={() => setIsOpen(false)}
						>
							<CloseIcon />
						</IconButton>
						<Styled.Title>{modalName}</Styled.Title>
						{children}
					</Styled.Content>
				</Styled.Container>
			</Styled.Wrapper>
		</Modal>
	);
}

export default AddClassModal;
