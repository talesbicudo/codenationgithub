import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import SearchInput from '../../components/SearchInput';
import RepositoryList from '../../components/RepositoryList';
import useRepositoriesWithSearch from '../../QueryHooks/useRepositoriesWithSearch';
import withPageLoad from '../../QueryHooks/withPageLoad';
import { getSearchQuery } from '../../redux/RepositoryData/reducer';
import Viewer from '../../Contexts/Viewer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
const fetchProps = `
    name
    createdAt
    description
    id
    url
`
const getPageInfo = data => {
    return data.search.pageInfo;
}

const fetchMoreHandler = (prev, next) => {
    const prevNodes = prev.search.nodes,
        fetchNodes = next.search.nodes,
        pageInfo = next.search.pageInfo;
    return {
        search: {
            __typename: prev.search.__typename,
            repositoryCount: prev.search.repositoryCount,
            pageInfo,
            nodes: [...prevNodes, ...fetchNodes]
        }
    }
}

export const RepositorySelectedList = ({ name, type, repositoriesData, selectedMonth, selectedYear, itemsPerPage }) => {
    const { login } = useContext(Viewer);
    const [search, setSearch] = useState('');
    const submitHandler = value => setSearch(value);

    const { loading, repositories, loadMore, hasNextPage } =
        withPageLoad({ getPageInfo, fetchMoreHandler }, useRepositoriesWithSearch({ fetchProps, itemsPerPage, search }));

    const isFirstRun = useRef(true);

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
        if (isFirstRun.current) {
            isFirstRun.current = false;
        } else {
            setSearch(dataSearch);
        }
    }, [dataSearch, repositoriesData])

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start">
            <h2>Detalhes</h2>
            <SearchInput onSubmit={submitHandler} initialValue={search} />
            {loading ?
                !isFirstRun.current && <CircularProgress style={{ marginTop: '25%' }} /> :
                <Box display="flex" justifyContent="space-around"
                    alignItems="center" width="100%" flexDirection="column" marginTop={"2rem"}>
                    <RepositoryList repositories={repositories} />
                    {hasNextPage && <Button style={{ marginTop: '1rem' }} onClick={loadMore}>Mais</Button>}
                </Box>
            }
        </Box>
    )
}

const stateToProps = ({ RepositoryData }) => ({
    repositoriesData: RepositoryData.data
})

export default connect(stateToProps)(RepositorySelectedList);