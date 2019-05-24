import React, { Fragment } from 'react';
import useUserOrLangSearch from '../../QueryHooks/useUserOrLangSearch';
import SearchList from '../../components/SearchList';
import SearchInput from '../../components/SearchInput'
import { connect } from 'react-redux';
import { searchListRequest, searchListCancel } from '../../redux/SearchList/ActionCreators'

export const MainSearch = ({ dispatch, searchValue = "", searchListVisibility }) => {

    const searchList = useUserOrLangSearch({
        search: searchValue,
        itemsPerPage: 3,
        LoadedComponent: SearchList,
    })

    const onChangeHandler = value => {
        if (value) {
            dispatch(searchListRequest(value));
        } else {
            dispatch(searchListCancel(value));
        }
    }

    const onFocusHandler = value => {
        dispatch(searchListRequest(value));
    }

    const onBlurHandler = value => {
        dispatch(searchListCancel(value));
    }

    return (
        <Fragment>
            <SearchInput onFocus={onFocusHandler} onBlur={onBlurHandler} onChange={onChangeHandler} placeholder="Usuário ou Linguagem" buttonText="procurar" />
            <div style={{ visibility: searchListVisibility }}>
                {searchList}
            </div>
        </Fragment>
    )

}

const mapStateToProps = ({ SearchList }) => {
    const { value, visibility, loading } = SearchList;
    return {
        searchValue: value,
        searchListVisibility: visibility,
        searchLoading: loading
    }
}

export default connect(mapStateToProps)(MainSearch)