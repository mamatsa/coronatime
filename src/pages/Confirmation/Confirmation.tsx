import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { emailConfirmRequest } from 'services/backendRequestsService';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthNavbar } from 'components';
import { CheckCircle } from 'assets';

const Confirmation: React.FC<{ text: string }> = (props) => {
  const { t } = useTranslation();

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hash = queryParams.get('hash');

    if (location.pathname === '/register/confirm/success' && hash) {
      try {
        emailConfirmRequest(hash);
      } catch {
        // pass catch;
      }
    }
  }, [location.pathname, location.search]);
  let displayText: string = '';

  if (location.pathname === '/register/confirm/success') {
    displayText = 'pending.account_confirmed';
  } else if (location.pathname === '/password/pending/success') {
    displayText = 'pending.password_updated';
  } else if (props.text) {
    displayText = props.text;
  }

  return (
    <div className=' w-full h-screen flex flex-col items-center py-10 px-5'>
      <AuthNavbar />
      <div className='flex flex-col justify-center items-center h-3/4 gap-4'>
        <img src={CheckCircle} alt='circle' width={56} />
        <p
          className=' text-text-dark text-[18px] text-center'
          id='confirmationMessage'
        >
          {t(displayText)}
        </p>
        <Link
          to='/login'
          className=' absolute bottom-10 right-5 left-5 xs:w-96 xs:my-16 xs:static'
        >
          <Outlet />
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
