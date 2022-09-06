import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  logout,
  userErrorSelector,
  userLogin,
  userSelector,
} from '../../../store/slices/userSlice';
import LoginForm from './LoginForm';
import style from './Modal.module.scss';

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const error = useAppSelector(userErrorSelector);
  const [userName, setUserName] = useState<string>();
  const [userPassword, setUserPassword] = useState<string>();
  const [loginMode, setLoginMode] = useState<string>('SignIn');
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userName);
    dispatch(userLogin(JSON.stringify({ username: userName, password: userPassword })));
  };

  return (
    <div className={style.modal_wpapper}>
      {!user && (
        <>
          <button type="button" onClick={() => setLoginMode('SignIn')}>
            Sign in
          </button>
          <button type="button" onClick={() => setLoginMode('SignUp')}>
            Sign up
          </button>
        </>
      )}
      {!user && loginMode === 'SignIn' && (
        <LoginForm
          handleSubmit={handleLoginSubmit}
          setUserName={setUserName}
          setUserPassword={setUserPassword}
          type="login"
          error={error}
        />
      )}
      {!user && loginMode === 'SignUp' && (
        <LoginForm
          handleSubmit={handleLoginSubmit}
          setUserName={setUserName}
          setUserPassword={setUserPassword}
          type="register"
          error={error}
        />
      )}
      {user && (
        <div>
          <button
            type="button"
            onClick={() => {
              dispatch(logout());
              setUserName('');
              setUserPassword('');
            }}>
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
