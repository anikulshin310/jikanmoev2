import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTop } from '../../api/apiURL';

import {
  loadMore,
  searchTypeTop,
  selectHasNextPage,
  selectPage,
  selectTopResults,
  selectLoading,
  clear,
} from '../../store/slices/typeContentSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import style from './TypeContent.module.scss';
import TypeContentItem from './TypeContentItem';
import LoadingLine from '../../components/LoadingLine';
import { IItem } from '../../store/slices/searchSlice';
import { changeType } from '../../store/slices/userSlice';

const TypeContent: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectTopResults);
  const type = location.pathname.split('/')[1];
  const page = useAppSelector(selectPage);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const loading = useAppSelector(selectLoading);
  useEffect(() => {
    dispatch(changeType(type));
    dispatch(clear());
    dispatch(searchTypeTop(getTop(type, 1)));
  }, [location]);
  useEffect(() => {
    if (page !== 1) {
      dispatch(searchTypeTop(getTop(type, page)));
    }
  }, [page]);
  useEffect(() => {
    function handleScroll() {
      if (
        document.documentElement.clientHeight + document.documentElement.scrollTop !==
        document.documentElement.scrollHeight
      )
        return;
      if (hasNextPage) {
        dispatch(loadMore());
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <div className={style.TypeContent}>
      {results &&
        results.length > 0 &&
        results.map((item: IItem) => (
          <TypeContentItem key={`${item.mal_id}-${item.title}`} item={item} type={type} />
        ))}
      {loading === 'loading' ? <LoadingLine /> : null}
    </div>
  );
};
export default TypeContent;
