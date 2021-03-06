import React from 'react';
import ListItem from '@material-ui/core/ListItem'
import { Link as RouterLink } from 'react-router-dom';

class ListItemLink extends React.Component {

    renderLink = React.forwardRef((itemProps, ref) => (
        <RouterLink data-testid="router-link" to={this.props.to} {...itemProps} innerRef={ref} />
    ));

    render() {
        return (
            <ListItem button component={this.renderLink}>{this.props.children}</ListItem>
        );
    }
}

ListItemLink.defaultProps = {
    to: "/"
}

export default ListItemLink;