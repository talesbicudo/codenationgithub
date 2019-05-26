import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import LanguageAvatar from '../LanguageAvatar';

const LanguageSearchListItem = ({ color, name }) => (
    <React.Fragment>
        <ListItemAvatar>
            <LanguageAvatar color={color} name={name} />
        </ListItemAvatar>
        <ListItemText primary={name} />
    </React.Fragment>

)

export default LanguageSearchListItem