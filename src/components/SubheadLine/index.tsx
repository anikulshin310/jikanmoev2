import React, { FC } from 'react';
import style from './SubheadLine.module.scss';

interface ISubheadLine {
  text: string;
}

const SubheadLine: FC<ISubheadLine> = ({ text }) => {
  return <div className={style.subheadline}>{text}</div>;
};
export default SubheadLine;
