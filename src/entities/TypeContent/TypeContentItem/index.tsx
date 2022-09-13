import React from 'react';
import { Link } from 'react-router-dom';

import style from './TypeContentItem.module.scss';

export interface ITypeContentItem {
  type: string;
  item: ITypeContentItemTypes;
}

export interface ITypeContentItemTypes {
  type: string;
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
    };
  };
}

const TypeContentItem: React.FC<ITypeContentItem> = ({ item, type }) => {
  return (
    <div key={item.mal_id} className={style.TypeContentItem}>
      <Link to={`/${type}/${item.mal_id}`}>
        <img src={item.images.jpg.image_url} alt={item.title} />
        <div className={style.TypeContentItemTitle}>{item.title}</div>
      </Link>
    </div>
  );
};
export default TypeContentItem;
