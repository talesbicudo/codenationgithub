import React from 'react';
import LanguageAvatar from './index';
import { render } from 'react-testing-library';


describe("LanguageAvatar", () => {
    it("Renders correct char", () => {
        const { getByText } = render(<LanguageAvatar name="Test" />);
        expect(getByText("T")).toHaveTextContent("T");
    })
    it("Renders correct color", () => {
        const { getByTestId } = render(<LanguageAvatar color="#00440f" />)
        expect(getByTestId("LangAvatar")).toHaveStyle('background-color: #00440f')
    })
})
