const TOKEN_LOC = "GITHUB_APP_TOKEN";

export const getToken = () => localStorage.getItem(TOKEN_LOC);

export const login = token => {
    localStorage.setItem(TOKEN_LOC, token);
    window.location.reload();
}

export const logout = () => {
    localStorage.removeItem(TOKEN_LOC);
    window.location.reload();
}

export const checkValidToken = token => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.status === 401) {
            reject(token);
        } else if (request.status === 205) {
            resolve(token)
        }
    }
    request.open('put', "https://api.github.com/notifications", true);
    request.setRequestHeader('Authorization', `token ${token}`);

    request.send();
})