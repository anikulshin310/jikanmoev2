import React, { useState, useEffect, FC } from 'react';
import { useLocation } from 'react-router-dom';
import style from './SearchInput.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { getAnimeSearch, getMangaSearch } from '../../api/apiURL';
import SearchResultsList from './SearchResultsList';
import { searchByName, selectResults } from '../../store/slices/searchSlice';

const SearchInput: FC = () => {
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectResults);
  const location = useLocation();
  const type = location.pathname.split('/')[1];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        dispatch(searchByName(type === 'anime' ? getAnimeSearch(value) : getMangaSearch(value)));
      }
    }, 333);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <div
      onMouseLeave={() => setVisible(false)}
      onMouseOver={() => {
        setVisible(true);
      }}
      className={style.search}
      onFocus={() => {
        setVisible(true);
      }}>
      <input className={style.searchInput} onChange={handleChange} placeholder="  Search..." />
      {visible && results && results.length > 0 && <SearchResultsList data={results} type={type} />}
    </div>
  );
};

export default SearchInput;
