import React from 'react';

import style from './SearchResultsListItem.module.scss';

interface ISearchResultsListItem {
  data: {
    url: string;
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
      };
    };
    type: string;
    year: number;
    status: string;
  };
}

const SearchResultsListItem: React.FC<ISearchResultsListItem> = ({ data }) => {
  return (
    <div className={style.SearchResultsListItem}>
      <img src={data.images.jpg.small_image_url} alt={data.title} />
      <div className={style.title}>
        <h4>{data.title}</h4>
        {data.year ? <h5>Year:{data.year}</h5> : null}
      </div>
      <div className={style.info}>
        <h5> Type: {data.type}</h5>
        <h5> Status:{data.status}</h5>
      </div>
    </div>
  );
};

export default SearchResultsListItem;
