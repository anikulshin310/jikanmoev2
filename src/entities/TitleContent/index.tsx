import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFullTitleInfo, getTitleRecommendations } from '../../api/apiURL';
import FavoritesIcon from '../../components/FavoritesIcon';
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
import {
  addToFavorites,
  changeType,
  deleteFromFavorites,
  userFavoritesSelector,
  userSelector,
} from '../../store/slices/userSlice';
import style from './TitleContent.module.scss';
import TitleContentGenres from './TitleContentGenres';
import TitleContentImage from './TitleContentImage';
import TitleContentRecommendations from './TitleContentRecommendations';
import TitleContentScore from './TitleContentScore';
import TitleContentSynopsis from './TitleContentSynopsis';
import TitleContentTitle from './TitleContentTitle';

const TitleContent: FC = () => {
  const location = useLocation();
  const type = location.pathname.split('/')[1];
  const dispatch = useAppDispatch();
  const result = useAppSelector(selectTitleResult);
  const recommendations = useAppSelector(selectTitleRecommendations);
  const favorites = useAppSelector(userFavoritesSelector);
  const user = useAppSelector(userSelector);
  const inFavorites = favorites[type].some((item) => item.mal_id === result?.mal_id);
  const loading = useAppSelector(selectTitleLoading);

  useEffect(() => {
    dispatch(clear());
    dispatch(changeType(type));
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
            <div className={style.ContentFirst}>
              {user && (
                <FavoritesIcon
                  inFavorites={inFavorites}
                  onAdd={() => dispatch(addToFavorites(result))}
                  onDelete={() => dispatch(deleteFromFavorites(result))}
                />
              )}
              <TitleContentImage image_url={result.images.jpg.image_url} title={result.title} />
              <TitleContentScore score={result.score} />
            </div>
            <div>
              <TitleContentGenres genres={result.genres} />
              <TitleContentSynopsis synopsis={result.synopsis} />
            </div>
          </div>

          {recommendations && recommendations.length > 0 ? (
            <TitleContentRecommendations recommendations={recommendations} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default TitleContent;
