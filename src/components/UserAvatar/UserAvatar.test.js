import React from 'react';
import UserAvatar from './index';
import { render } from 'react-testing-library';


describe("UserAvatar", () => {
    it("Renders correct char", () => {
        const { getByTestId } = render(<UserAvatar name="Test" />);
        expect(getByTestId('UserAvatarContainer')).toHaveTextContent("");
    })
    
})
