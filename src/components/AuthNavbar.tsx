import React from 'react';
import { Link } from 'react-router-dom';
import LanguageChanger from 'components/LanguageChanger';
import { Logo } from 'components/svg';

const AuthNavbar = () => {
  return (
    <div className='flex justify-between md:gap-24'>
      <Link to='/login'>
        <Logo />
      </Link>
      <LanguageChanger />
    </div>
  );
};

export default AuthNavbar;
