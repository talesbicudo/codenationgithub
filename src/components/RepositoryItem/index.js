import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const RepositoryItem = ({ name="Undefined", createdAt="2014-01-01", url="https://github.com", description="Empty Description" }) => {
    const ptData = useMemo(() => {
        const data = new Date(createdAt),
            dia = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(),
            mesF = (mes.length === 1) ? '0' + mes : mes,
            anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    }, [createdAt])

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
