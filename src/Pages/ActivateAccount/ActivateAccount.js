import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import withCatch from "Utils/withCatch";

import { activateAccount } from "Services/auth.service";

import VerifyEmailPresentation from "Components/VerifyEmailPresentation";

function ActivateAccount() {
	const [loadingApi, setLoadingApi] = useState(0);
	const { activateAccountToken } = useParams();

	const activateAccountFunc = async () => {
		const [result, error] = await withCatch(
			activateAccount({ token: activateAccountToken })
		);
		if (error) {
			// eslint-disable-next-line no-undef
			console.log(error);
			setLoadingApi(-1);
			return;
		}
		if (Object.keys(result.data).length !== 0) {
			setLoadingApi(1);
			return;
		}
		setLoadingApi(-1);
	};

	useEffect(() => {
		activateAccountFunc();
	}, []);

	return (
		<VerifyEmailPresentation
			isFullScreen
			isLoading={!loadingApi}
			isFailed={loadingApi === -1}
			messageToShow={[
				"Fail to activate account",
				"Account activated successfully",
			]}
		/>
	);
}

export default ActivateAccount;
