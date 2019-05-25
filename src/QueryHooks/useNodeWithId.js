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

const useNodeWithId = ({ id, nodeType, nodeProps }) => {

    const fragment = gql`
        fragment nodeFragment on ${nodeType} {
            ${nodeProps}
        }
    `

    const mapDataToProps = data => ({ node: data.node });
    return useCheckedQuery(query(fragment), mapDataToProps, { variables: { id } });

}

export default useNodeWithId;