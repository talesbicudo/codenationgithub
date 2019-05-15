import { client } from './client';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { createApi } from '../api';

describe("API testing", () => {

    const Api = createApi({commitsPerPage: 10});
    const testlogin = "andrew";

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

            expect(data).not.toBeInstanceOf(Error);
        })

        it('Retrieve commit by a given username', async () => {
            const data = await Api.userRepositories(testlogin);
            expect(data).not.toBeInstanceOf(Error);
        })

    })