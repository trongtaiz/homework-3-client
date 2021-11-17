import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassHeader from "../../Components/ClassDetail/ClassHeader";
import Stream from "../../Components/ClassDetail/Stream";
import People from "../../Components/ClassDetail/People";
import { connect } from "react-redux";
import { getClassDetail } from "../../Redux/actions/classes";

function ClassDetail(props) {
	const { id, subNav } = useParams();
	useEffect(() => {
		props.getClassDetail(id);
	}, []);
	return (
		<>
			{subNav === "stream" && (
				<>
					<ClassHeader navTag={0} name={props.name} />
					<Stream name={props.name} id={id} />
				</>
			)}
			{subNav === "people" && (
				<>
					<ClassHeader navTag={2} name={props.name} />
					<People id={id} />
				</>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return { name: state.currentClass.class.name };
};

export default connect(mapStateToProps, { getClassDetail })(ClassDetail);
