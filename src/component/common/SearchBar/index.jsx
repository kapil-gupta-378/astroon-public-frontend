import Image from 'next/image';
import React from 'react';
import searchIcon from './../../../../public/assets/images/search.png';
import styles from './searchBar.module.scss';
const SearchBar = ({ inputTextValue, handleSearch }) => {
  return (
    <div className={styles.search_bar_wrap}>
      <Image
        src={searchIcon}
        width={20}
        height={20}
        layout="fixed"
        alt="search icon"
      />
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search"
        value={inputTextValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
