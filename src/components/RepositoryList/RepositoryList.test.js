import React from 'react';
import RepositoryList from './index';
import { render } from 'react-testing-library';

describe('Repository list component', () => {
    it("Renders with empty repositories", () => {
        const { queryByTestId } = render(<RepositoryList />)
        expect(queryByTestId('repositoryItem')).toBeNull()
    })
    it("Renders with repositoris list", () => {
        const { getByText } = render(<RepositoryList repositories={[{name: "test"}]} />)
        expect(getByText(/test/)).toHaveTextContent('test');
    })
})

