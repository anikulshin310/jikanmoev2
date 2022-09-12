import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import SubheadLine from '../../components/SubheadLine';
import { useAppSelector } from '../../store/hooks';
import { userFavoritesSelector, userSelector } from '../../store/slices/userSlice';
import style from './UserProfile.module.scss';

const UserProfile: FC = () => {
  const user = useAppSelector(userSelector);
  const favorites = useAppSelector(userFavoritesSelector);
  return (
    <div className={style.profileWrapper}>
      <div>
        <SubheadLine text="Profile" />
        <div>
          First Name: {user?.fname}
          <br />
          Last Name: {user?.lname}
          <br />
          E-mail: {user?.email}
        </div>
      </div>

      <div className={style.userFavorites}>
        <SubheadLine text="Anime" />
        <ol>
          {favorites.anime.map((item, i) => (
            <Link key={item.mal_id + item.title} to={`/anime/${item.mal_id}`}>
              {' '}
              <li>{item.title}</li>
            </Link>
          ))}
        </ol>
        <SubheadLine text="Manga" />
        <ol>
          {favorites.manga.map((item, i) => (
            <Link
              key={item.mal_id + item.title}
              className={style.listItem}
              to={`/manga/${item.mal_id}`}>
              <li>{item.title}</li>
            </Link>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default UserProfile;
