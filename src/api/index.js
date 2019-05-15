import { createClient } from './client';
import gql from 'graphql-tag';

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
    return {
        userRepositories: login =>
            client.query({ variables: { login, commitsPerPage }, query: COMMITS_QUERY })
                .then(({ data }) => data),
        getClient: () => client
    }
}
