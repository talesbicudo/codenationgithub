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


