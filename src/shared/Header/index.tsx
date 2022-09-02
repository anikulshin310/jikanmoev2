import React, { FC } from 'react';
import Button from '../../components/Button';
import SearchInput from '../../entities/SearchInput';

import style from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={style.headerWrapper}>
      <div className={style.header}>
        <div>
          <Button text="anime" />
          <Button text="manga" />
        </div>
        <SearchInput />
      </div>
    </div>
  );
};
export default Header;
