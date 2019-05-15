const netWorkErrorMessages = {
    401: "Authentication: You must be logged in a github account",
    404: `Not found: Verify if ${process.env.REACT_APP_API_ENDPOINT} still a valid endpoint`
}

export default netWorkErrorMessages;