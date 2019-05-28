import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchInput from '../../components/SearchInput';
import RepositoryList from '../../components/RepositoryList';
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch';

const fetchProps = `
    name
    createdAt
    description
    id
`

const RepositorySelectedList = ({ itemsPerPage }) => {

    const [search, setSearch] = useState('test');

    const submitHandler = value => setSearch(value);

    const { loading, repositories } = useRepositoriesWithSearch({ fetchProps, itemsPerPage, search })

    return (
        <Box diplay="flex" height="40rem" justifyContent="flex-start" alignItems="center">
            <SearchInput onSubmit={submitHandler} initialValue={search} />
            {loading ?
                <CircularProgress /> :
                <RepositoryList repositories={repositories} />
            }
        </Box>
    )
}


export default RepositorySelectedList;