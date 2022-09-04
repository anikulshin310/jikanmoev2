import React, { FC } from 'react';

interface IRecommendationItem {
  mal_id: number;
  title: string;
  image_url: string;
}
const RecommendationsItem: FC<IRecommendationItem> = ({
  mal_id,
  title,

  image_url,
}) => {
  return <div>{mal_id}</div>;
};

export default RecommendationsItem;
