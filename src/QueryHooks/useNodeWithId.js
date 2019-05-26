import useCheckedQuery from './useCheckedQuery'
import gql from 'graphql-tag';

const query = (fragment) => gql`
    query ($id: ID!){
        node(id: $id) {
           ...nodeFragment 
        }
    }
    ${fragment}
`

const useNodeWithId = ({ id, nodeType, nodeProps, mapDataToProps }) => {

    const fragment = gql`
        fragment nodeFragment on ${nodeType} {
            ${nodeProps}
        }
    `
    const usedMapDataToProps = mapDataToProps || (data => ({ node: data.node }));
    return useCheckedQuery(query(fragment), usedMapDataToProps, { variables: { id } });

}

export default useNodeWithId;