const url = 'http://localhost:3000';

const getSearch = async (word) => {
	const parseUrl = new URL(`/search?q=${word}`, url);

	return fetch(parseUrl).then(
		async (response) => {
			const jsonResponse = await response.json();

			return jsonResponse.suggestions;
		},
	);
};

export { getSearch };
