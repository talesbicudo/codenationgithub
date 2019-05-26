import React from 'react';
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch'
import Header from '../../components/Header';

const LanguageHeader = ({ name }) => {
    const fetchProps = `
        primaryLanguage {
            color
        } 
    `
    const { loading, repositories, totalCount } = useRepositoriesWithSearch({ search: `language:${name}`, fetchProps })
    if (loading) return <p>Loading...</p>
    return (
        <Header name={name}
            avatar={<div style={{ width: '5vw', height: "30%", backgroundColor: repositories[0].primaryLanguage.color }} />}
            totalCount={totalCount}
        />
    )
}

export default LanguageHeader;