import React, { FC } from 'react';

interface IUserMenu {
  logout: () => void;
  userName: string;
}
const UserMenu: FC<IUserMenu> = ({ logout, userName }) => {
  return (
    <>
      {userName}
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default UserMenu;
