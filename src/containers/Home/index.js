import React from 'react';
import RepositoryList from '../../components/RepositoryList';
import useUserByLogin from '../../QueryHooks/useUserByLogin';
import useUserOrLangSearch from '../../QueryHooks/useUserOrLangSearch';
import SearchList from '../../components/SearchList';
import SearchInput from '../../components/SearchInput'
import { connect } from 'react-redux';
import { searchListRequest, searchListCancel } from '../../redux/SearchList/ActionCreators'

export const Home = ({ dispatch, searchValue = "", searchListVisibility }) => {

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

    // const userProfile = useUserByLogin({
    //     login: 'ada-lovecraft',
    //     repositoriesPerPage: 5,
    //     LoadedComponent: RepositoryList,
    //     LoaderComponent: () => <p>Loading...</p>
    // })

    return <React.Fragment>
        <SearchInput onChange={onChangeHandler} placeholder="Usuário ou Linguagem" buttonText="procurar" />
        <div style={{ visibility: searchListVisibility }}>
            {searchList}
        </div>
        {/* {userProfile} */}
    </React.Fragment>
}

const mapStateToProps = ({ SearchList }) => {
    const { value, visibility } = SearchList;
    return {
        searchValue: value,
        searchListVisibility: visibility
    }
}


export default connect(mapStateToProps)(Home);