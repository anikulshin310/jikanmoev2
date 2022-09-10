import React, { FC } from 'react';
import style from './LoginForm.module.scss';

interface ILoginForm {
  handleSubmit: (e: React.FormEvent) => void;
  setUserName: (value: React.SetStateAction<string | undefined>) => void;
  setUserPassword: (value: React.SetStateAction<string | undefined>) => void;
  setFirstName?: (value: React.SetStateAction<string | undefined>) => void;
  setLastName?: (value: React.SetStateAction<string | undefined>) => void;
  type: string;
  message?: string | null;
}
const LoginForm: FC<ILoginForm> = ({
  handleSubmit,
  setUserName,
  setUserPassword,
  setFirstName,
  setLastName,
  type,
  message,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={style.item_name}>E-mail:</div>
        <input onChange={(e) => setUserName(e.currentTarget.value)} type="email" required />
        <div className={style.item_name}>Password:</div>
        <input onChange={(e) => setUserPassword(e.currentTarget.value)} type="password" required />
        {type === 'registration' && (
          <>
            <div className={style.item_name}>First name:</div>
            <input onChange={(e) => setFirstName!(e.currentTarget.value)} required />
            <div className={style.item_name}>Last name:</div>
            <input onChange={(e) => setLastName!(e.currentTarget.value)} required />
          </>
        )}

        <button type="submit">{type}</button>
      </form>
      {message && <div className={style.message}>{message}</div>}
    </>
  );
};
export default LoginForm;
