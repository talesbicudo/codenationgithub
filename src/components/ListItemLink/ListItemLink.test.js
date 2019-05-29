import React from 'react';
import ListItemLink from './index';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

describe("ListItemLink", () => {
    it("Renders", () => {
        const { getByTestId, getByText } = render(<MemoryRouter><ListItemLink>Test</ListItemLink></MemoryRouter>)
        expect(getByText("Test")).toBeTruthy();
        expect(getByTestId("router-link")).toBeTruthy();
    })
})