import React from 'react';
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch'
import Header from '../../components/Header';
import LanguageAvatar from '../../components/LanguageAvatar';
import Box from '@material-ui/core/Box';

const LanguageHeader = ({ name }) => {
    const fetchProps = `
        primaryLanguage {
            color
        } 
    `
    const { loading, repositories, totalCount } = useRepositoriesWithSearch({ search: `language:${name}`, fetchProps })
    if (loading) return null;
    const color = repositories.length ? repositories[0].primaryLanguage.color : "#000000"
    return (
        <Box display="flex" height="100%" alignItems="center">
            {!repositories.length ? <h1>Linguagem Não achada: Busca Geral</h1> :
                <Header name={name}
                    avatar={<LanguageAvatar big name={name} color={color} />}
                    totalCount={totalCount}
                />
            }
        </Box>
    )
}

export default LanguageHeader;