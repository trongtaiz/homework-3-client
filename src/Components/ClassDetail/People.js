import * as React from "react";
import {
	PeopleHeader,
	PeopleHeaderEnd,
	PeopleHeaderStart,
	PeopleImageContainer,
	PeopleInfoSection,
	PeopleLine,
	PeopleName,
	PeopleWrapper,
} from "./People.styled";
import { connect } from "react-redux";
import {
	getStudentsInClass,
	getTeachersInClass,
} from "../../Redux/actions/classes";
import { useEffect } from "react";

function People(props) {
	useEffect(() => {
		props.getTeachersInClass(props.id);
		props.getStudentsInClass(props.id);
	}, []);
	console.log("props", props);
	const { students, teachers } = props;
	return (
		<PeopleWrapper>
			<PeopleHeader>Teachers</PeopleHeader>
			{teachers?.map((teacher) => (
				<PeopleLine key={teacher.user_id}>
					<PeopleInfoSection>
						<PeopleImageContainer src="/avatar.png" />
						<PeopleName>{teacher.user.name}</PeopleName>
					</PeopleInfoSection>
				</PeopleLine>
			))}
			<PeopleHeader>
				<PeopleHeaderStart>Classmates</PeopleHeaderStart>
				<PeopleHeaderEnd>
					{students?.length + " students"}
				</PeopleHeaderEnd>
			</PeopleHeader>
			{students?.map((student) => (
				<PeopleLine key={student.user_id}>
					<PeopleInfoSection>
						<PeopleImageContainer src="/avatar.png" />
						<PeopleName>{student.user.name}</PeopleName>
					</PeopleInfoSection>
				</PeopleLine>
			))}
		</PeopleWrapper>
	);
}

const mapStateToProps = (state) => {
	console.log("state", state);
	return {
		students: state.classes.students,
		teachers: state.classes.teachers,
	};
};

export default connect(mapStateToProps, {
	getTeachersInClass,
	getStudentsInClass,
})(People);
