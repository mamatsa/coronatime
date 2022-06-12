import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'assets';
import { useTranslation } from 'react-i18next';
import { Sidebar } from 'types';

const MobileSidebar: React.FC<Sidebar> = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        onClick={props.onSidebarClose}
        id='mobileNavBackdrop'
        className='absolute bottom-0 right-0 left-0 top-0 backdrop-blur-sm backdrop-brightness-125 backdrop-opacity-80 cursor-pointer '
      ></div>
      <ul className='absolute right-0 bottom-0 top-0 bg-light-gray w-2/5 flex py-9 flex-col justify-between items-center'>
        <li className='flex items-center gap-2'>
          <img src={User} alt='' />
          <p className=' font-bold text-xl'>{props.username}</p>
        </li>
        <li>
          <Link
            to='/login'
            onClick={props.onLogout}
            id='mobileNavLogout'
            className=' text-lg font-medium border border-white py-2 px-4 rounded-2xl text-slate-900'
          >
            {t('log_out')}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileSidebar;
