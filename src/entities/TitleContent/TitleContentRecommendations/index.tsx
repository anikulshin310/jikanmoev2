import React, { FC, useEffect } from 'react';
import type { IItem } from '../../../store/slices/searchSlice';
import RecommendationsItem from './RecommendationsItem';
import style from './TitleContentRecommendations.module.scss';

export interface ITitleContentRecommendations {
  items: any;
}
interface IRecommendationItem {
  entry: IItem;
}

const TitleContentRecommendations: FC<ITitleContentRecommendations> = ({ items }) => {
  useEffect(() => console.log(items), [items]);
  return (
    <div className={style.TitleContentRecommendations}>
      Recommendations:
      {items.map((item: IRecommendationItem) => (
        <RecommendationsItem
          mal_id={item.entry.mal_id}
          title={item.entry.title}
          image_url={item.entry.images.jpg.image_url}
        />
      ))}
    </div>
  );
};

export default TitleContentRecommendations;
