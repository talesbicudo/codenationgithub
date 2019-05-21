import Axios from 'axios';

const TOKEN_LOC = "GITHUB_APP_TOKEN";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const getAuthToken = () => localStorage.getItem(TOKEN_LOC);

export const isLogged = () => !!getAuthToken();

export const login = code =>
    Axios.get('http://localhost:9999/authenticate/' + code)
        .then(({ data }) => {
            if (data.token) {
                localStorage.setItem(TOKEN_LOC, data.token);
            }
            window.location = '/';
        });


export const logout = () => {
    localStorage.removeItem(TOKEN_LOC);
    window.location.reload();
}

export const redirectToGitAuth = () => {
    window.location =
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`
}
