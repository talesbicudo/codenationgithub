import React, { Fragment } from 'react';
import useUserIdWithSearch from '../../QueryHooks/useUserIdWithSearch';
import SearchList from '../../components/SearchList';
import SearchInput from '../../components/SearchInput'
import { connect } from 'react-redux';
import { searchListRequest, searchListSuccess, searchListCancel } from '../../redux/SearchList/ActionCreators'
import languages from '../../data/languages.json';
import Box from '@material-ui/core/Box';
export const MainSearch = ({ initialValue, dispatch, searchValue = "", searchListVisibility, searchLoading }) => {

    const createLink = item =>
        `/${item.type.toLowerCase()}/${item.name}`

    const loadedHandler = () => {
        if (searchLoading) {
            dispatch(searchListSuccess());
        }
    }

    const { loading, error, users } = useUserIdWithSearch({
        search: searchValue,
        itemsPerPage: 3,
    })

    const onChangeHandler = value => {
        if (value) {
            dispatch(searchListRequest(value));
        } else {
            dispatch(searchListCancel(value));
        }
    }

    const onFocusHandler = (value, event) => {
        if (value) {
            dispatch(searchListRequest(value));
        }
    }

    const onBlurHandler = value => {
        dispatch(searchListCancel(value));
    }

    const selectedLanguages = searchValue ?
        languages.filter(({ name }) =>
            name.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
            .slice(0, 2).map(({ name, id }) => ({ type: 'Language', id, name })) :
        [];

    const selectedUsers = !loading && !error ? users
        .map(user => ({ type: 'User', id: user.id, name: user.login })) :
        []
    const items = [...selectedLanguages, ...selectedUsers];


    return (
        <Fragment>
            <SearchInput onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                placeholder="Pesquisar"
                initialValue={initialValue}
            />
            <Box style={{visibility: searchListVisibility}}>
                <SearchList
                    open={searchListVisibility}
                    items={items}
                    createLink={createLink}
                    onLoaded={loadedHandler}
                    loading={searchLoading} />

            </Box>
        </Fragment>
    )

}

const mapStateToProps = ({ SearchList, Profile }) => {
    const { value, visibility, loading } = SearchList;
    return {
        searchValue: value,
        searchListVisibility: visibility,
        searchLoading: loading
    }
}

export default connect(mapStateToProps)(MainSearch)