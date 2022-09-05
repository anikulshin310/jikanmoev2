import React, { FC } from 'react';
import style from './RecommendationsItem.module.scss';

interface IRecommendationsItem {
  title: string;
  image_url: string;
}
const RecommendationsItem: FC<IRecommendationsItem> = ({
  title,

  image_url,
}) => {
  return (
    <div className={style.RecommendationsItem}>
      <img src={image_url} alt={title} />
    </div>
  );
};

export default RecommendationsItem;
