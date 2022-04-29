import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { setCurrentPage, setSearchParam } from '../PostsList/postsSlice';

import searchIcon from '../../assets/icons/search.png';

import styles from './Search.module.css';

const Search = () => {

    const searchSelector = createSelector(
        state => state.posts.searchParam,
        searchParam => searchParam
    );

    const searchParam = useSelector(searchSelector);
    const dispatch = useDispatch();

    const handlerSearchInputChange = (e) => {
        dispatch(setCurrentPage(1));
        dispatch(setSearchParam(e.target.value.toLowerCase()))
    }
    
    return (
        <div className={styles.wrapper}>
            <input onChange={handlerSearchInputChange} value={searchParam} type="text" className={styles.searchInput} placeholder="Поиск"/>
            <button disable="true" className={styles.searchBtn}><img src={searchIcon} alt="searchIcon" /></button>
        </div>
    );
};

export default Search;