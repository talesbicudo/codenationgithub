import useCheckQueryStatus from './useCheckQueryStatus';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const query = (fragment) => gql`
    query ($id: ID!){
        node(id: $id) {
           ...nodeFragment 
        }
    }
    ${fragment}
`

const useNodeWithId = ({ id, type, fetchProps, loadedProps, ...statusProps }) => {
    const fragment = gql`
        fragment nodeFragment on ${type} {
            ${fetchProps}
        }
    `
    const queryResultProps = useQuery(query(fragment), {variables: {id}});
    const innerloadedProps = () => ({...queryResultProps.data.node, ...loadedProps});
    return useCheckQueryStatus({...statusProps, loadedProps: innerloadedProps, queryResultProps});
}

export default useNodeWithId;