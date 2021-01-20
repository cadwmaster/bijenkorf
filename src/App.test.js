import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';
import { getSearch } from './helpers/api-manager';
jest.mock('./helpers/api-manager');

afterEach(() => {
  cleanup();
});

it('renders the application', () => {
  expect.hasAssertions();

  const { container } = render(<App />);

  expect(container.querySelector('.app')).toBeVisible();
});

it('handleChange is called with a value', async () => {
  expect.hasAssertions();

  const { container } = render(<App />);

  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: 'aaaa' } })

  await waitFor(() => {
    expect(getSearch).toBeCalled();
  });
});
