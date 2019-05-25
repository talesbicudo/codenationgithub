import UserSearchListItem from './UserSearchListItem';
import LanguageSearchListItem from './LanguageSearchListItem';

export default {
    User: {
        nodeProps: `avatarUrl
                     login`,
        Component: UserSearchListItem
    },
    Language:
        {
            nodeProps: `color
                        name`,
            Component: LanguageSearchListItem
        }
}

