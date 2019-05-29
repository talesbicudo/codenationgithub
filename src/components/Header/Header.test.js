import React from 'react';
import Header from './index';
import { render } from 'react-testing-library';

describe("Header", () => {
    it("Renders", () => {
        const { getByText } = render(<Header />)
        expect(getByText(/Repositórios/)).toHaveTextContent("Repositórios: 0");
        expect(getByText(/avatar/)).toHaveTextContent('avatar')
        expect(getByText(/user/)).toHaveTextContent('user')
    })
})