import { createClient } from './client';
import gql from 'graphql-tag';
import networkErrorMessages from './networkErrorMessages';

const COMMITS_QUERY = gql`
    query ($login: String! $commitsPerPage: Int! $after: String) {
        user(login: $login){
            repositories(first: $commitsPerPage after: $after) {
                totalCount
                nodes {
                name
                createdAt
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
    }
`

export const createApi = (authToken, { commitsPerPage = 10 }) => {

    const client = createClient(authToken);
    const handleError = error => {
        const networkError = error.networkError;
        if (networkError) {
            const statusCode = networkError.statusCode;
            return {
                error: {
                    message:
                        `[Network Error] ${networkErrorMessages[statusCode] || `Status code: ${statusCode}`} }`
                }
            }
        }
    }

    return {
        userRepositories: login =>
            client.query({ variables: { login, commitsPerPage }, query: COMMITS_QUERY })
                .then(({ data }) => data)
                .catch(error => handleError(error)),
        getClient: () => client
    }
}
