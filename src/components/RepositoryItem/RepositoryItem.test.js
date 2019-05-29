import React from 'react';
import RepositoryItem from './index';
import { render } from 'react-testing-library';

describe("Repository Item", () => {
    it("Renders", () => {
        const { getByText }= render(<RepositoryItem />)
        expect(getByText(/Criado em:/)).toHaveTextContent("Criado em: 31/12/2013")
        expect(getByText(/Página/)).toHaveAttribute("href", "https://github.com");
        expect(getByText(/Undefined/)).toHaveTextContent("Undefined");
        expect(getByText(/Empty/)).toHaveTextContent("Empty Description");
    })
})