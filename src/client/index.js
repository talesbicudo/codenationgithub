
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { ApolloLink, concat, split } from 'apollo-link';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';
import { getAuthToken } from '../services/login';


export const ENDPOINT_URI = "https://api.github.com/graphql"

const httpLink = createHttpLink({ uri: ENDPOINT_URI })
const batchHttpLink = new BatchHttpLink({uri: ENDPOINT_URI});

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(context => ({
        headers: {
            ...context.headers,
            authorization: `Bearer ${getAuthToken()}`
        }
    }))
    return forward(operation)
})

const usedHttpLink = split(({getContext}) => getContext().batch, batchHttpLink, httpLink);

const link = concat(authLink, usedHttpLink);
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({ cache, link });

export default client;