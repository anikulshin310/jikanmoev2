import React, { FC } from 'react';
import Header from '../../shared/Header';

import style from './PageLayout.module.scss';

interface IPageLayout {
  children: React.ReactNode;
}

const PageLayout: FC<IPageLayout> = ({ children }) => {
  return (
    <div className={style.page_wrapper}>
      <Header />
      <div className={style.content}>
        <div className={style.content_wpapper}>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
