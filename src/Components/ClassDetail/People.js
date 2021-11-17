import * as React from "react";
import {
	InviteIcon,
	PeopleHeader,
	PeopleHeaderEnd,
	PeopleImageContainer,
	PeopleInfoSection,
	PeopleLine,
	PeopleName,
	PeopleWrapper,
} from "./People.styled";
import { Role } from "Utils/constants";
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
	const { students, teachers, user, role } = props;
	return (
		<PeopleWrapper>
			<PeopleHeader>
				Teachers
				<PeopleHeaderEnd>
					{role === Role.TEACHER && <InviteIcon />}
				</PeopleHeaderEnd>
			</PeopleHeader>
			{teachers?.map((teacher) => (
				<PeopleLine key={teacher.user_id}>
					<PeopleInfoSection>
						<PeopleImageContainer src="/avatar.png" />
						<PeopleName>{teacher.user.name}</PeopleName>
					</PeopleInfoSection>
				</PeopleLine>
			))}
			<PeopleHeader>
				{role === Role.STUDENT ? "Classmates" : "Students"}
				<PeopleHeaderEnd>
					<div>
						{students?.length + " students"}
						{role === Role.TEACHER && <InviteIcon />}
					</div>
				</PeopleHeaderEnd>
			</PeopleHeader>
			{students?.reduce(function (result, student) {
				if (student.user_id !== user?.id) {
					result.push(
						<PeopleLine key={student.user_id}>
							<PeopleInfoSection>
								<PeopleImageContainer src="/avatar.png" />
								<PeopleName>{student.user.name}</PeopleName>
							</PeopleInfoSection>
						</PeopleLine>
					);
				}
				return result;
			}, [])}
		</PeopleWrapper>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		role: state.currentClass.role,
		students: state.currentClass.students,
		teachers: state.currentClass.teachers,
	};
};

export default connect(mapStateToProps, {
	getTeachersInClass,
	getStudentsInClass,
})(People);
