import React from 'react';

import PostsList from '../../components/PostsList/PostsList';
import Search from '../../components/Search/Search';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <section className={styles.wrapper}>
            <Search />
            <PostsList />
        </section>
    );
};

export default HomePage;