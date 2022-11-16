import Image from 'next/image';
import React, { useCallback } from 'react';
import searchIcon from './../../../../public/assets/images/search.png';
import styles from './searchBar.module.scss';
import debounce from 'lodash.debounce';
const SearchBar = ({ inputValue, typeValue }) => {

  // start debounce technic
  const changeHandler = (e) => {
    typeValue(e)
  }
  
  const onChangeInputHandler = useCallback(
    debounce((e) => changeHandler(e), 800)
    , []);
  // end debounce technic

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
        defaultValue={inputValue}
        onChange={onChangeInputHandler}
        className={styles.search_input}
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
