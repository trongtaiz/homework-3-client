import { GET_POST } from "./types";

import * as postService from "Services/post.service";

export const getAllPostsInClass = (id) => async (dispatch) => {
	try {
		const { data } = await postService.getAllPostsInClass(id);
		dispatch({
			type: GET_POST,
			payload: data.data,
		});
	} catch (error) {
		// eslint-disable-next-line no-undef
		console.log(error);
	}
};
