import React from 'react';

import { setCurrentPage } from '../PostsList/postsSlice';

import styles from './PageNav.module.css';

const PageNav = ({ pagesCount, currentPage, dispatch }) => {

    const pagesNumberArr = pagesCount ? [...Array(pagesCount).keys()] : [];

    const handlerCurrentPage = (page) => {
        dispatch(setCurrentPage(page));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.backBtn}>
                <button disabled={currentPage === 1} onClick={() => handlerCurrentPage(currentPage - 1)} className={styles.btn}>Назад</button>
            </div>
            <div className={styles.pages}>
                {
                    pagesNumberArr.map(item =>
                        <span className={currentPage === item + 1 ? styles.activePage : null}
                            onClick={(e) => handlerCurrentPage(e.target.textContent)} key={item}>{item + 1}</span>
                    )
                }
            </div>
            <div className={styles.nextBtn}>
                <button disabled={pagesCount === currentPage} onClick={() => handlerCurrentPage(currentPage + 1)} className={styles.btn}>Далее</button>
            </div>
        </div>
    );
};

export default PageNav;