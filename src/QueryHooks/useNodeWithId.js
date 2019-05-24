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

const useNodeWithId = ({ id, type, fetchProps, ...statusProps }) => {
    const fragment = gql`
        fragment nodeFragment on ${type} {
            ${fetchProps.join('\n')}
        }
    `
    const queryResultProps = useQuery(query(fragment), {variables: {id}});
    const loadedProps = () => queryResultProps.data.node;
    return useCheckQueryStatus({...statusProps, loadedProps, queryResultProps});
}

export default useNodeWithId;