import { getSearch } from './api-manager';

const suggestions = [
	{
		searchterm: 'test1'
	},
	{
		searchterm: 'test2'
	}
];

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({ suggestions }),
	})
);


it('getSearch - Call the API with the query as a query parameter and return the array of suggestions', async () => {
	expect.hasAssertions();

	const fetchSuggestions = await getSearch('this is a test');

	expect(fetchSuggestions).toStrictEqual(suggestions);
});