import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory';

const
    ENDPOINT_URI = process.env.REACT_APP_API_ENDPOINT,
    ENDPOINT_TOKEN = process.env.REACT_APP_API_TOKEN

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: ENDPOINT_URI })

const authMiddleware = new ApolloLink((operation, foward) => {
    operation.setContext(context => ({
        headers: {
            ...context.headers,
            authorization: `Bearer ${ENDPOINT_TOKEN}`
        }
    }))
    return foward(operation);
})

const link = authMiddleware.concat(httpLink);
export const client = new ApolloClient({ cache, link });
