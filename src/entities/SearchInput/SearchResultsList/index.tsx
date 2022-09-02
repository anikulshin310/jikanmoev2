import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './SearchResultsList.module.scss';
import SearchResultsListItem from './SearchResultItem';

export interface ISearchResultsList {
  type: string;
  data: [
    {
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
    }
  ];
}

const SearchResultsList: FC<ISearchResultsList> = ({ data, type }) => {
  return (
    <div className={style.searchResults}>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.mal_id}>
              <Link to={`/${type}/${item.mal_id}`}>
                <SearchResultsListItem data={item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResultsList;
