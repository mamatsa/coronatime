import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageChanger } from 'components/';
import { Logo } from 'components/svg';

const AuthNavbar = () => {
  return (
    <div className='flex justify-between gap-5 xs:gap-24'>
      <Link to='/login'>
        <Logo className=' w-full xs:w-fit' />
      </Link>
      <LanguageChanger />
    </div>
  );
};

export default AuthNavbar;
