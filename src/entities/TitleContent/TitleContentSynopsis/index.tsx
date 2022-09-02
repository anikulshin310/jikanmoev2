import React, { FC } from 'react';
import SubheadLine from '../../../components/SubheadLine';
import style from './TitleContentSynopsis.module.scss';

interface ITitleContentSynopsis {
  synopsis: string;
}

const TitleContentSynopsis: FC<ITitleContentSynopsis> = ({ synopsis }) => {
  return (
    <div className={style.TitleContentSynopsis}>
      <SubheadLine text="Synopsis" />
      <p>{synopsis}</p>
    </div>
  );
};

export default TitleContentSynopsis;
