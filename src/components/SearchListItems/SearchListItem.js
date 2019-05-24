import UserSearchListItem from '../SearchListItems/UserSearchListItem';
import LanguageSearchListItem from '../SearchListItems/LanguageSearchListItem';
import useNodeWithId from '../../QueryHooks/useNodeWithId';

const nodeMaps = {
    User: { fetchProps: ["avatarUrl", "login"], LoadedComponent: UserSearchListItem },
    Language: {fetchProps: ["color", "name"], LoadedComponent: LanguageSearchListItem}
}

const SearchListItem = ({ id, type }) => useNodeWithId({ id, type, ...nodeMaps[type] });

export default SearchListItem;
