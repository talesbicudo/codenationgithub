import { login, isLogged, logout, getAuthToken, TOKEN_LOC } from './login';
import axios from 'axios';
jest.mock('axios');

axios.get.mockImplementation(() => Promise.resolve({ data: { token: 'token' } }));

describe('Login Service', () => {
    beforeEach(() => {
        localStorage.clear();
    })
    it('logins stores token on localStorage and go to root folder', async () => {
        window.location.assign = jest.fn();
        await login();
        expect(localStorage.getItem(TOKEN_LOC)).toBe('token');
        expect(window.location.assign).toBeCalledWith('/');
    })
    it('GetAuthToken reads the correct value', async () => {
        await login();
        expect(getAuthToken()).toBe('token');
    })
    it('Islogged reads token', async () => {
        expect(isLogged()).toBe(false);
        await login();
        expect(isLogged()).toBe(true);
    })
    it('Logout clears token', async () => {
        window.location.reload = jest.fn();
        await login();
        logout();
        expect(localStorage.getItem(TOKEN_LOC)).toBe(undefined);
        expect(window.location.reload).toHaveBeenCalledTimes(1);
    })
})