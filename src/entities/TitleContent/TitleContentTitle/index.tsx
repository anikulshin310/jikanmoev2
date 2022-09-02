import React, { FC } from 'react';
import style from './TitleContentTitle.module.scss';

interface ITitleContentTitle {
  title: string;
}
const TitleContentTitle: FC<ITitleContentTitle> = ({ title }) => {
  return (
    <div className={style.TitleContentTitle}>
      <h1>{title}</h1>
    </div>
  );
};
export default TitleContentTitle;
