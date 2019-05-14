import { client } from '../api';
import gql  from 'graphql-tag';
import { ApolloClient } from 'apollo-client';

describe("API testing", () => {
    it('Creates a valid Apollo Client', () => {
        expect(client).toBeInstanceOf(ApolloClient);
    })

    it('Send valid graphql queries', async () => {
        const query = gql`
            query {
                user(login: "talesbicudo"){
                    login
                }
            } `
        const data = await client.query({ query })
            .then(data => data)
            .catch(error => error)

            console.log(data)
        expect(data).not.toBeInstanceOf(Error);
    })

})