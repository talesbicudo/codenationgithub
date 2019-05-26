import gql from 'graphql-tag';
import useCheckedQuery from './useCheckedQuery'

const mapDataToProps = data => ({ user: data.user })

const useUserWithLogin = ({
    login = '',
    repositoriesPerPage = 5,
    fetchProps,
    ...queryProps
}) => {

    const UserFragment = gql`
        fragment UserParts on User {
            ${fetchProps}
        } 
    `
    const otherUserQuery = gql`
        query ($login: String! ) {
            user(login: $login){
                ...UserParts 
            }
        }
    ${UserFragment}`

    const viewerQuery = gql`
        query  {
            user: viewer {
                ...UserParts
            }
        }
    ${UserFragment}`

    const query = login ? otherUserQuery : viewerQuery;
    const variables = { login, repositoriesPerPage };
    return useCheckedQuery(query, mapDataToProps, { variables, ...queryProps });
}


export default useUserWithLogin;