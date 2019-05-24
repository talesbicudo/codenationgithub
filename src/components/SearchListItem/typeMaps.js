import UserSearchListItem from './UserSearchListItem';
import LanguageSearchListItem from './LanguageSearchListItem';

export default {
    User: {
        fetchProps: `avatarUrl
                     login`,
        LoadedComponent: UserSearchListItem
    },
    Language:
        {
            fetchProps: `color
                        name`,
            LoadedComponent: LanguageSearchListItem
        }
}

