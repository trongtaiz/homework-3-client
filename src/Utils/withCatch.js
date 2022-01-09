export default async function withCatch(promise) {
	let result, error;
	try {
		result = await promise;
	} catch (err) {
		error = err;
	}

	return [result, error];
}
