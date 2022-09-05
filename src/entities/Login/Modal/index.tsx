import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout, userLogin, userSelector } from '../../../store/slices/userSlice';
import style from './Modal.module.scss';

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [userName, setUserName] = useState<string>();
  const [userPassword, setUserPassword] = useState<string>();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userName);
    dispatch(userLogin(JSON.stringify({ username: userName, password: userPassword })));
  };

  return (
    <div className={style.modal_wpapper}>
      {!user ? (
        <form onSubmit={handleSubmit}>
          <div className={style.item_name}>E-mail:</div>
          <input onChange={(e) => setUserName(e.currentTarget.value)} type="email" />
          <div className={style.item_name}>Password:</div>
          <input onChange={(e) => setUserPassword(e.currentTarget.value)} type="password" />
          <button type="submit">Sign In</button>
        </form>
      ) : (
        <>
          <div>{user.username}</div>
          <div>
            <button type="button" onClick={() => dispatch(logout())}>
              logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
