import React from 'react';
import Search from './Search';

export default {
	component: Search,
	title: 'Search',
};

const Template = (args) => <Search {...args} />;

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

export const Empty = Template.bind({});
Empty.args = {
	placeholder: "Search here"
};

export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
	initialValue: 'suggestion',
	suggestions
};