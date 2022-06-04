import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/svg';
import { LanguageChanger } from 'components';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ username: string | null; onLogout: () => void }> = (
  props
) => {
  const { t } = useTranslation();

  return (
    <div className=' flex justify-between mb-16'>
      <Logo />
      <ul className='flex gap-8'>
        <li>
          <LanguageChanger dashboard={true} />
        </li>
        <li>
          <p className=' font-bold'>{props.username}</p>
        </li>
        <div className=' w-px h-8 bg-light-gray'></div>
        <li>
          <Link to='/login' onClick={props.onLogout}>
            {t('log_out')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
