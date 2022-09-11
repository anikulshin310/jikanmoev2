import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './UserMenu.module.scss';

interface IUserMenu {
  logout: () => void;
  userId: number;
}
const UserMenu: FC<IUserMenu> = ({ logout, userId }) => {
  return (
    <div className={style.UserMenu}>
      {' '}
      <Link to={`/user/${userId}`}>
        <button type="button">Profile</button>
      </Link>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
