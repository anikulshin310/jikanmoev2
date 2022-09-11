import React, { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clear,
  registrationMessageSelector,
  userRegistration,
} from '../../../store/slices/registrationSlice';
import {
  logout,
  userErrorSelector,
  userLogin,
  userSelector,
} from '../../../store/slices/userSlice';
import LoginForm from './LoginForm';
import style from './Modal.module.scss';
import UserMenu from './UserMenu';

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const error = useAppSelector(userErrorSelector);
  const message = useAppSelector(registrationMessageSelector);
  const [userName, setUserName] = useState<string>();
  const [userPassword, setUserPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [loginMode, setLoginMode] = useState<string>('SignIn');
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userLogin(JSON.stringify({ username: userName, password: userPassword })));
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      userRegistration(
        JSON.stringify({
          fname: firstName,
          lname: lastName,
          username: userName,
          password: userPassword,
          email: userName,
          avatar: 'https://www.melivecode.com/users/cat.png',
        })
      )
    );
  };
  const handleUserSave = () => {};

  return (
    <div className={style.modal_wpapper}>
      {!user && (
        <>
          <button type="button" onClick={() => setLoginMode('SignIn')}>
            sign in
          </button>
          <button type="button" onClick={() => setLoginMode('SignUp')}>
            sign up
          </button>
        </>
      )}
      {!user && loginMode === 'SignIn' && (
        <LoginForm
          handleSubmit={handleLoginSubmit}
          setUserName={setUserName}
          setUserPassword={setUserPassword}
          type="login"
          message={error}
        />
      )}
      {!user && loginMode === 'SignUp' && (
        <LoginForm
          handleSubmit={handleRegisterSubmit}
          setUserName={setUserName}
          setUserPassword={setUserPassword}
          setFirstName={setFirstName}
          setLastName={setLastName}
          type="registration"
          message={message}
        />
      )}
      {user && (
        <UserMenu
          logout={() => {
            dispatch(logout());
            setUserName('');
            setUserPassword('');
            dispatch(clear());
          }}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default Modal;
