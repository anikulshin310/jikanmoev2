import React, { FC } from 'react';
import SubheadLine from '../../../components/SubheadLine';
import style from './TitleContentGenres.module.scss';

interface ITitleContentGenres {
  genres: [];
}

const TitleContentGenres: FC<ITitleContentGenres> = ({ genres }) => {
  return (
    <div className={style.TitleContentGenres}>
      <SubheadLine text="Genres" />
      {genres.map((genre: { name: string; mal_id: number }) => (
        <li key={genre.mal_id}>{genre.name}</li>
      ))}
    </div>
  );
};

export default TitleContentGenres;
