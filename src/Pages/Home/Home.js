import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Class from "Components/Class";

import * as Styled from "./Home.styled";

import { fetchAndSetClass } from "Redux/actions/classes";

function Home() {
	const dispatch = useDispatch();
	const { classes } = useSelector((state) => state.classes);

	useEffect(() => {
		dispatch(fetchAndSetClass());
	}, []);

	return (
		<Styled.Wrapper>
			{classes.map((eachClass) => (
				<Class
					key={eachClass.id}
					id={eachClass.id}
					name={eachClass.name}
				/>
			))}
		</Styled.Wrapper>
	);
}

export default Home;
