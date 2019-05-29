import React, { useState, useContext, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import SearchInput from '../../components/SearchInput';
import RepositoryList from '../../components/RepositoryList';
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch';
import { getSearchQuery } from '../../redux/RepositoryData/reducer';
import Viewer from '../../Contexts/Viewer';

const fetchProps = `
    name
    createdAt
    description
    id
`

export const RepositorySelectedList = ({ name, type, repositoriesData, selectedMonth, selectedYear, itemsPerPage }) => {
    const { login } = useContext(Viewer);
    const [search, setSearch] = useState('test');
    const submitHandler = value => setSearch(value);
    const { loading, repositories } = useRepositoriesWithSearch({ fetchProps, itemsPerPage, search })

    const searchQuery = getSearchQuery({ name: name || login, type });

    const dataSearch = useMemo(() => {
        try {
            const lastInterval = repositoriesData[repositoriesData.length - 1].interval;
            return searchQuery({
                first: repositoriesData[0].interval.first,
                last: lastInterval.last || lastInterval.first
            })
        } catch (e) {
            return searchQuery({ first: null, last: null })
        }
    }, [repositoriesData, searchQuery])

    useEffect(() => {
        setSearch(dataSearch);
    }, [dataSearch, repositoriesData])

    return (
        <Box diplay="flex" justifyContent="flex-start" height="60vh" width="50%" alignItems="center">
            <SearchInput onSubmit={submitHandler} initialValue={search} />
            {!loading &&
                <RepositoryList repositories={repositories} />
            }
        </Box>
    )
}

const stateToProps = ({ RepositoryData }) => ({
    repositoriesData: RepositoryData.data
})

export default connect(stateToProps)(RepositorySelectedList);