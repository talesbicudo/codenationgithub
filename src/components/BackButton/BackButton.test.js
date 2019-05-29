import React from 'react';
import BackButton from './index';
import { render } from 'react-testing-library';
describe('Back buttonj', () => {
    it('renders', () => {
        const { getByText } = render(<BackButton/>);
        expect(getByText('Voltar')).toHaveTextContent('Voltar')
    })
})