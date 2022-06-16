import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageChanger, Logo } from 'components';

const AuthNavbar = () => {
  return (
    <div className='flex justify-between gap-5 xs:gap-28 w-full xs:w-auto'>
      <Link to='/login'>
        <Logo className=' w-full xs:w-fit' />
      </Link>
      <LanguageChanger />
    </div>
  );
};

export default React.memo(AuthNavbar);
