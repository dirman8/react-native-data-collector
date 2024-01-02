export default function updateForm(state, payload) {
	return {
		...state,
		...payload,
	};
}
