import React, { useState } from "react";

import * as Styled from "./AppLayout.styled";
import AppHeader from "Components/AppHeader";
import AppDrawer from "Components/AppDrawer";

function AppLayout(props) {
	const { children } = props;
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	return (
		<div>
			<AppHeader
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
			<AppDrawer
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
			<Styled.Wrapper>{children}</Styled.Wrapper>
		</div>
	);
}

export default AppLayout;
