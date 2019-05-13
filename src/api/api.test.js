describe("API testing", () => {
    it('loads enviroment variable', () => {
        expect(process.env.REACT_APP_API_ENDPOINT).toBe("https://api.github.com/graphql");
    })
})