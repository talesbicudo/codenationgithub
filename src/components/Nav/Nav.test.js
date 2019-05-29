import React from 'react';
import Nav from './index';
import { render } from 'react-testing-library';

describe("Nav Component", () => {
    it("Renders", () => {
        const {getByText, getByTestId} = render(<Nav>Content</Nav>)
        expect(getByText("Content")).toHaveTextContent("Content")
    })
})
