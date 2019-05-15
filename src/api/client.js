import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const
    ENDPOINT_URI = process.env.REACT_APP_API_ENDPOINT,
    ENDPOINT_TOKEN = process.env.REACT_APP_API_TOKEN

const cache = new InMemoryCache();
const link = createHttpLink({ uri: ENDPOINT_URI, headers: { authorization: `Bearer ${ENDPOINT_TOKEN}` } })

export const client = new ApolloClient({ cache, link });
