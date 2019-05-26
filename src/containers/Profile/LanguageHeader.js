import React from 'react';
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch'
import Header from '../../components/Header';
import LanguageAvatar from '../../components/LanguageAvatar';
const LanguageHeader = ({ name }) => {
    const fetchProps = `
        primaryLanguage {
            color
        } 
    `
    const { loading, repositories, totalCount } = useRepositoriesWithSearch({ search: `language:${name}`, fetchProps })
    if (loading) return null; 
    return (
        <Header name={name}
            avatar={<LanguageAvatar big name={name} color={repositories[0].primaryLanguage.color} />}
            totalCount={totalCount}
        />
    )
}

export default LanguageHeader;