import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SubheadLine from '../../../components/SubheadLine';
import type { IItem } from '../../../store/slices/searchSlice';
import RecommendationsItem from './RecommendationsItem';
import style from './TitleContentRecommendations.module.scss';

export interface ITitleContentRecommendations {
  recommendations: IRecommendationItem[];
}
export interface IRecommendationItem {
  entry: IItem;
}

const TitleContentRecommendations: FC<ITitleContentRecommendations> = ({ recommendations }) => {
  const slicedItems = recommendations.slice(0, 8);
  const location = useLocation();
  const type = location.pathname.split('/')[1];

  return (
    <>
      <SubheadLine text="Recommendations" />
      <div className={style.TitleContentRecommendations}>
        {slicedItems &&
          slicedItems.map((item: IRecommendationItem) => (
            <Link to={`/${type}/${item.entry.mal_id}`} key={item.entry.mal_id}>
              <RecommendationsItem
                title={item.entry.title}
                image_url={item.entry.images.jpg.image_url}
              />
            </Link>
          ))}
      </div>
    </>
  );
};

export default TitleContentRecommendations;
