import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { formatDateToPtBr } from '../../helpers';

const RepositoryItem = ({ name = "Undefined", createdAt = "2014-01-01", url = "https://github.com", description = "Empty Description" }) => {

    const ptData = useMemo(() =>
        formatDateToPtBr(createdAt)
        , [createdAt])

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div> <h3>{name}</h3> <p> Criado em: {ptData}</p></div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box display="flex" flexDirection="column">
                    <Box>{description}</Box>
                    <Link target="_blank" href={url}> Página </Link>
                </Box>
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
