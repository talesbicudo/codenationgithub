import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const ENDPOINT_URI = process.env.REACT_API_ENDPOINT;
const cache = new InMemoryCache();
const link = createHttpLink({ uri: ENDPOINT_URI })
export const client = new ApolloClient({ cache, link });
