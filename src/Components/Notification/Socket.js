import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

export default function MockSocket({ userId }) {
	const history = useHistory();
	const handleOnClick = (link) => history.push(link);

	useEffect(() => {
		const socket = io("http://localhost:4300/notification");
		socket.emit("subscribe", userId, (data) => {
			console.log("Subscribe successfully", data);
		});

		// then listen on notifications emitted from server
		socket.on("receive-notification", (data) => {
			console.log("receive-notification", data);
			toast(data.message, {
				onClick: () => handleOnClick(data.link),
			});
		});

		return () => {
			socket.disconnect();
		};
	}, [userId]);

	return (
		<ToastContainer
			position="bottom-right"
			autoClose={5000}
			hideProgressBar={false}
			closeOnClick={false}
			pauseOnHover
		/>
	);
}
