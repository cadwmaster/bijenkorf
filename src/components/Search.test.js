import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from './Search';

afterEach(() => {
	cleanup();
});

it('render the component without attributes', () => {
	expect.hasAssertions();

	const { container } = render(<Search />);

	expect(container.querySelector('.search-container')).toBeVisible();
});

it('render the component with attributes', () => {
	expect.hasAssertions();

	const { container } = render(<Search placeholder="Search" minLength="5" debounceTime="100" />);

	expect(container.querySelector('.search-container')).toBeVisible();
});

it('the component render suggestions', () => {
	expect.hasAssertions();

	const suggestions = [
		{
			searchterm: 'something'
		},
		{
			searchterm: 'something else'
		}
	];

	const { container } = render(<Search suggestions={suggestions} />);

	expect(container.querySelectorAll('.suggestion-container')).toHaveLength(suggestions.length);
});

it('handleChange is trigger after input change', async () => {
	expect.hasAssertions();

	const spy = jest.fn();

	const { container } = render(<Search debounceTime="1" onChange={spy} />);
	const input = container.querySelector('input');
	const textValue = 'test';

	fireEvent.change(input, {target: {value: textValue}});

	await waitFor(() => {
		expect(spy).toBeCalledWith(textValue);
	});
});

it('handleChange is trigger after input change', () => {
	expect.hasAssertions();

	const spy = jest.fn();

	const { container } = render(<Search debounceTime="1" minLength="5" onChange={spy} />);
	const input = container.querySelector('input');

	fireEvent.change(input, {target: {value: 'test'}});

	expect(spy).not.toBeCalled();
});

it('handleClear when icon is clicked', () => {
	expect.hasAssertions();


	const suggestions = [
		{
			searchterm: 'something'
		},
		{
			searchterm: 'something else'
		}
	];

	const { container, getByTestId } = render(<Search suggestions={suggestions} />);
	const input = container.querySelector('input');
	const clearButton = getByTestId('clear-button');
	const textValue = 'test';

	fireEvent.change(input, {target: {value: textValue}});
	expect(input.value).toBe(textValue);
	fireEvent.click(clearButton);
	expect(input.value).toBe('');
	expect(container.querySelectorAll('.suggestion-container')).toHaveLength(0);
});