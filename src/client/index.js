import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const ENDPOINT_URI = "https://api.github.com/graphql"
export const TOKEN_LOC = "GITHUB_APP_TOKEN";

export const getToken = () => localStorage.getItem(TOKEN_LOC);

export const setToken = token => localStorage.setItem(TOKEN_LOC, token);

const httpLink = createHttpLink({ uri: ENDPOINT_URI })

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(context => ({
        headers: {
            ...context.headers,
            authorization: `Bearer ${getToken()}`
        }
    }))
    return forward(operation)
})

const link = concat(authLink, httpLink);
const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link });

export default client;