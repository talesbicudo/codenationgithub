import React, { Fragment } from 'react';
import useUserIdWithSearch from '../../QueryHooks/useUserIdWithSearch';
import SearchList from '../../components/SearchList';
import SearchInput from '../../components/SearchInput'
import { connect } from 'react-redux';
import { searchListRequest, searchListSuccess, searchListCancel } from '../../redux/SearchList/ActionCreators'

export const MainSearch = ({ initialValue, dispatch, searchValue = "", searchListVisibility, searchLoading }) => {

    const createLink = item =>
        `/${item.type.toLowerCase()}/${item.name}`

    const loadedHandler = () => {
        dispatch(searchListSuccess());
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

    const onFocusHandler = value => {
        if (value) {
            dispatch(searchListRequest(value));
        }
    }

    const onBlurHandler = value => {
        dispatch(searchListCancel(value));
    }


    const items = !loading && !error ? [...users.map(user => ({ type: 'User', id: user.id }))] : [];


    return (
        <Fragment>
            <SearchInput onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                placeholder="Usuário ou Linguagem"
                buttonText="procurar"
                initialValue={initialValue}
            />
            <div style={{ visibility: searchListVisibility }}>
                <SearchList items={items} createLink={createLink} onLoaded={loadedHandler} loading={searchLoading} />
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