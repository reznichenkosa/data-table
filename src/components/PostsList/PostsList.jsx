import React, { useEffect, useState } from 'react';
import PostsItem from '../PostsItem/PostsItem';
import styles from './PostsList.module.css';
import arrow from '../../assets/icons/arrow.png';
import PageNav from '../PageNav/PageNav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsSlice';
import { createSelector } from '@reduxjs/toolkit';
import sortByParam from '../../utils/sort';

const PostsList = () => {

    const [sortParam, setSortParam] = useState('');

    const postsSelector = createSelector(
        state => state.posts.posts,
        state => state.posts.postsLoadingStatus,
        state => state.posts.currentPage,
        state => state.posts.searchParam,
        (posts, postsLoadingStatus, currentPage, searchParam) => ({ posts, postsLoadingStatus, currentPage, searchParam })
    );

    const { posts, postsLoadingStatus, currentPage, searchParam } = useSelector(postsSelector);
    const dispatch = useDispatch();

    const sortedPosts = sortByParam(posts, sortParam).filter(item =>
        String(item.id).includes(searchParam) ||
        item.title.includes(searchParam) ||
        item.body.includes(searchParam));

    const postsOnePage = sortedPosts.slice((currentPage - 1) * 10, 10 * currentPage);

    const pagesCount = Math.ceil(sortedPosts.length / 10);

    useEffect(() => {
        dispatch(fetchPosts())
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        const showPage = pagesCount > 1 ? `?page=${currentPage}` : ' ';
        window.history.replaceState(null, null, showPage);
        // eslint-disable-next-line 
    }, [currentPage])

    const handlerSort = (param) => {
        switch (param) {
            case 'id':
                sortParam === 'idUpDown' ? setSortParam('idDownUp') : setSortParam('idUpDown');
                break;
            case 'title':
                sortParam === 'titleUpDown' ? setSortParam('titleDownUp') : setSortParam('titleUpDown');
                break;
            case 'body':
                sortParam === 'bodyUpDown' ? setSortParam('bodyDownUp') : setSortParam('bodyUpDown');
                break;
            default: setSortParam('');
        }
    }

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th className={styles.th110}>
                            <span onClick={() => handlerSort('id')}>
                                ID
                                <img className={sortParam === "idUpDown" ? styles.activeArrow : styles.arrow} src={arrow} alt="arrow" />
                            </span>
                        </th>
                        <th className={styles.th530}>
                            <span onClick={() => handlerSort('title')}>
                                Заголовок
                                <img className={sortParam === "titleUpDown" ? styles.activeArrow : styles.arrow} src={arrow} alt="arrow" />
                            </span>
                        </th>
                        <th >
                            <span onClick={() => handlerSort('body')}>
                                Описание
                                <img className={sortParam === "bodyUpDown" ? styles.activeArrow : styles.arrow} src={arrow} alt="arrow" />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {postsLoadingStatus === 'loading' || postsOnePage.map(item =>
                        <PostsItem key={item.id} {...item} />)}
                </tbody>
            </table>
            {
                postsLoadingStatus === 'loading' ||
                pagesCount < 2 ||
                <PageNav pagesCount={Number(pagesCount)} currentPage={Number(currentPage)} dispatch={dispatch} />
            }
            {postsLoadingStatus === 'loading' && <div className={styles.messages}>Загрузка данных...</div>}
            {postsLoadingStatus === 'error' && <div className={styles.messages}>Что-то пошло не так!!!</div>}
        </div>
    );
};

export default PostsList;