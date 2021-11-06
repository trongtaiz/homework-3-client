import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Class from "Components/Class";

import { fetchAndSetClass } from "Redux/actions/classes";

function Home() {
	const dispatch = useDispatch();
	const { classes } = useSelector((state) => state.classes);
	// eslint-disable-next-line no-undef

	useEffect(() => {
		dispatch(fetchAndSetClass());
	}, []);

	return (
		<>
			{classes.map((eachClass) => (
				<Class key={eachClass.id} name={eachClass.name} />
			))}
		</>
	);
}

export default Home;
