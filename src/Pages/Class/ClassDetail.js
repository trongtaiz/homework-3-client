import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as classService from "../../Services/class.service";
import ClassHeader from "../../Components/ClassDetail/ClassHeader";
import Stream from "../../Components/ClassDetail/Stream";
import People from "../../Components/ClassDetail/People";

function ClassDetail() {
	const { id, subNav } = useParams();
	const [name, setName] = useState(null);
	const getClass = (id) => {
		classService
			.getClassDetail(id)
			.then((response) => {
				setName(response.data.data.name);
			})
			.catch((e) => {
				// eslint-disable-next-line no-undef
				console.log(e);
			});
	};
	useEffect(() => {
		getClass(id);
	}, []);
	return (
		<>
			{subNav === "stream" && (
				<>
					<ClassHeader navTag={0} name={name} />
					<Stream name={name} id={id} />
				</>
			)}
			{subNav === "people" && (
				<>
					<ClassHeader navTag={2} name={name} />
					<People id={id} />
				</>
			)}
		</>
	);
}

export default ClassDetail;