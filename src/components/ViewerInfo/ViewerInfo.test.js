import React from 'react';
import ViewerInfo from './index';
import { render, getByAltText } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

describe("ViewerInfo", () => {
        it("Renders", () => {
            const { getByText, getByAltText } = render(<MemoryRouter><ViewerInfo /></MemoryRouter>)
            expect(getByText('undefined')).toHaveTextContent('undefined');
            expect(getByAltText(/undefined/)).toHaveAttribute('src', "#")
        })
    })
