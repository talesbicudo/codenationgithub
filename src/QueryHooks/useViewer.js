import gql from 'graphql-tag';
import useCheckedQuery from './useCheckedQuery';

const query = gql`
        query  {
            viewer {
                login
                avatarUrl
            }
        }`

const useViewer = () => 
    useCheckedQuery(query, ({ viewer }) => ({viewer}), {});


export default useViewer;