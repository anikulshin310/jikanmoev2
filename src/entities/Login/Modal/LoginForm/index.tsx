import React, { FC } from 'react';
import style from './LoginForm.module.scss';

interface ILoginForm {
  handleSubmit: (e: React.FormEvent) => void;
  setUserName: (value: React.SetStateAction<string | undefined>) => void;
  setUserPassword: (value: React.SetStateAction<string | undefined>) => void;
  type: string;
  error?: string | null;
}
const LoginForm: FC<ILoginForm> = ({ handleSubmit, setUserName, setUserPassword, type, error }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={style.item_name}>E-mail:</div>
        <input onChange={(e) => setUserName(e.currentTarget.value)} type="email" />
        <div className={style.item_name}>Password:</div>
        <input onChange={(e) => setUserPassword(e.currentTarget.value)} type="password" />
        {type === 'register' && (
          <>
            <div className={style.item_name}>First name:</div>
            <input onChange={(e) => setUserName(e.currentTarget.value)} type="email" />
            <div className={style.item_name}>Last name:</div>
            <input onChange={(e) => setUserPassword(e.currentTarget.value)} type="password" />
          </>
        )}

        <button type="submit">{type}</button>
      </form>
      {error && 'Login or password is invalid'}
    </>
  );
};
export default LoginForm;
