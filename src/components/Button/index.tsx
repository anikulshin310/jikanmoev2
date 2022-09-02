import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Button.module.scss';

interface IButton {
  text: string;
}

const Button: FC<IButton> = ({ text }) => {
  const location = useLocation();

  const type = location.pathname.split('/')[1];

  return (
    <Link to={`/${text}`}>
      <button className={text === type ? style.buttonActive : style.button} type="button">
        {text}
      </button>
    </Link>
  );
};
export default Button;
