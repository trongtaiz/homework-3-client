import React, { useState } from "react";
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
import InviteEmailModal from "Components/InviteEmailModal";
import { useEffect } from "react";
import { IconButton } from "@mui/material";

function People(props) {
	useEffect(() => {
		props.getTeachersInClass(props.id);
		props.getStudentsInClass(props.id);
	}, []);
	const { students, teachers, user, role } = props;
	const [isOpenInviteEmail, setIsOpenInviteEmail] = useState(false);
	const [roleToInvite, setRoleToInvite] = useState("");

	const openInviteEmailModal = (role) => {
		setIsOpenInviteEmail(true);
		setRoleToInvite(role);
	};
	return (
		<PeopleWrapper>
			<PeopleHeader>
				Teachers
				<PeopleHeaderEnd>
					{role === Role.TEACHER && (
						<IconButton
							onClick={() => openInviteEmailModal(Role.TEACHER)}
						>
							<InviteIcon />
						</IconButton>
					)}
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
						{role === Role.TEACHER && (
							<IconButton
								onClick={() =>
									openInviteEmailModal(Role.STUDENT)
								}
							>
								<InviteIcon />
							</IconButton>
						)}
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
			<InviteEmailModal
				role={roleToInvite}
				isOpenModal={isOpenInviteEmail}
				setIsOpenModal={setIsOpenInviteEmail}
			/>
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
