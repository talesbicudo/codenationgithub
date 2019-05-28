import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const RepositoryItem = ({ name, createdAt, description }) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography >{name} {createdAt}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                   {description} 
          </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}

RepositoryItem.propTypes = {
    name: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string
}

export default RepositoryItem
