import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/svg';
import { LanguageChanger } from 'components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className=' flex justify-between mb-16'>
      <Logo />
      <ul className='flex gap-8'>
        <li>
          <LanguageChanger dashboard={true} />
        </li>
        <li>
          <p className=' font-bold'>Name</p>
        </li>
        <div className=' w-px h-8 bg-light-gray'></div>
        <li>
          <Link to='/login'>{t('log_out')}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
