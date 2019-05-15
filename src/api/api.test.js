import { ApolloClient } from 'apollo-client';
import { createApi } from '../api';

describe("API testing", () => {
    const token = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
    const Api = createApi(token, { commitsPerPage: 10 });
    const testLogin = "andrew";

    it('Creates a valid Apollo Client', () => {
        const client = Api.getClient();
        expect(client).toBeInstanceOf(ApolloClient);
    })

    it('Retrieve commit by a given username', async () => {
        const data = await Api.userRepositories(testLogin);
        expect(data).not.toBeInstanceOf(Error);
    })

})