import { GET_POST } from "Redux/actions/types";

const initialState = { posts: [] };

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_POST:
			return { posts: [...payload] };
		default:
			return state;
	}
}
