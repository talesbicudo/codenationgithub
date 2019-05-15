import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const ENDPOINT_URI = process.env.REACT_APP_API_ENDPOINT;

const cache = new InMemoryCache();

export const createClient = authToken => new ApolloClient(
    {
        cache,
        link:
            createHttpLink({ uri: ENDPOINT_URI, headers: { authorization: authToken } })
    });
