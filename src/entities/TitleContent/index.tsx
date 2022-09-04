import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFullTitleInfo, getTitleRecommendations } from '../../api/apiURL';
import LoadingLine from '../../components/LoadingLine';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import {
  searchTitle,
  selectTitleResult,
  selectTitleRecommendations,
  selectTitleLoading,
  searchRecommendations,
  clear,
} from '../../store/slices/titleContentSlice';
import style from './TitleContent.module.scss';
import TitleContentGenres from './TitleContentGenres';
import TitleContentImage from './TitleContentImage';
import TitleContentRecommendations from './TitleContentRecommendations';
import TitleContentScore from './TitleContentScore';
import TitleContentSynopsis from './TitleContentSynopsis';
import TitleContentTitle from './TitleContentTitle';

const TitleContent: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const result = useAppSelector(selectTitleResult);
  const recommendations = useAppSelector(selectTitleRecommendations);
  const loading = useAppSelector(selectTitleLoading);

  useEffect(() => {
    dispatch(clear());
    const timer = setTimeout(() => {
      dispatch(searchTitle(getFullTitleInfo(location.pathname)));
      dispatch(searchRecommendations(getTitleRecommendations(location.pathname)));
    }, 333);

    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  return (
    <div className={style.TitleContent}>
      {loading === 'loading' ? <LoadingLine /> : null}

      {result && result.mal_id && (
        <>
          <TitleContentTitle title={result.title} />

          <div className={style.TitleContentInner}>
            <TitleContentImage image_url={result.images.jpg.image_url} title={result.title} />
            <TitleContentGenres genres={result.genres} />
            <TitleContentSynopsis synopsis={result.synopsis} />
          </div>
          <TitleContentScore score={result.score} />
          {recommendations ? <TitleContentRecommendations items={recommendations} /> : null}
        </>
      )}
    </div>
  );
};

export default TitleContent;
