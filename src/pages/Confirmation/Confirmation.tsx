import React, { useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from 'components/svg';
import { CheckCircle } from 'assets/images';

const baseURL: string = 'https://coronatime-api.devtest.ge/api/confirm-account';

const Confirmation: React.FC<{ text: string }> = (props) => {
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hash = queryParams.get('hash');
    const confirmEmail = (hash: string | null) => {
      axios
        .post(baseURL, {
          hash,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (location.pathname === '/register/confirm/success' && hash) {
      confirmEmail(hash);
    }
  }, [location.pathname, location.search]);

  return (
    <div className=' w-full h-screen flex flex-col items-center'>
      <Logo className=' my-10' />
      <div className='flex flex-col justify-center items-center h-3/4 gap-4'>
        <img src={CheckCircle} alt='circle' width={56} />
        <p className=' text-text-dark text-[18px]'>
          {location.pathname === '/register/success'
            ? 'Your account is confirmed you can sign in'
            : props.text}
        </p>
        <Link to='/login' className=' w-96 my-16'>
          <Outlet />
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
