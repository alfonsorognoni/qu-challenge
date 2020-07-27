import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../App';
import { getResults } from "../tools/SWAPI";
jest.mock("../tools/SWAPI");

test('list work as expected', async () => {
  const res = {results: [{ id: 1, name: "My planet", url: "/1" }]};
  getResults.mockResolvedValueOnce(res);
  render(<App />)
  expect(getResults).toHaveBeenCalledTimes(1);
  expect(getResults).toHaveBeenCalledWith('planets');
  await waitFor(() => expect(screen.getByText("My planet")).toBeInTheDocument());
  res.results.forEach((planet) =>
    expect(screen.getByText(planet.name)).toBeInTheDocument()
  );
})