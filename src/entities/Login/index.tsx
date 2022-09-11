import React, { FC, useEffect, useRef, useState } from 'react';
import style from './Login.module.scss';
import Modal from './Modal';

const Login: FC = () => {
  const [isModal, setIsModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isModal && ref.current && !ref.current.contains(e.target as Node)) {
        setIsModal(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isModal]);
  return (
    <div ref={ref} className={style.Login}>
      <button type="button" onClick={() => setIsModal(!isModal)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
      {isModal ? <Modal /> : null}
    </div>
  );
};
export default Login;
