import React from 'react';
import Search from './Search';

export default {
	component: Search,
	title: 'Search',
};

const suggestions = [{
	searchterm: 'suggestion number 1',
	nrResults: 100
}, {
	searchterm: 'suggestion number 2',
	nrResults: 1000
}, {
	searchterm: 'suggestion number 3',
	nrResults: 10000
}];

export const Empty = () => (
	<Search placeholder="Search here" />
);

export const WithSuggestions = () => (
	<Search suggestions={suggestions} initialValue='suggestion' />
);