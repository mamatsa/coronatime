import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'components/svg';
import { LanguageChanger } from 'components';
import { Link } from 'react-router-dom';
import { Burger } from 'pages/Dashboard/components/svg';
import { MobileSidebar } from 'pages/Dashboard/components/';
import { NavbarComponent } from 'types';

const Navbar: React.FC<NavbarComponent> = (props) => {
  const { t } = useTranslation();

  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  const sidebarOpenHandler = () => {
    setSidebarIsOpen(true);
  };

  const sidebarCloseHandler = () => {
    setSidebarIsOpen(false);
  };

  return (
    <div className=' flex justify-between items-center mb-16'>
      <Logo className=' mr-4' />
      <ul className='flex gap-3 md:gap-8'>
        <li>
          <LanguageChanger dashboard={true} />
        </li>
        <li className='gap-8 hidden md:flex'>
          <p className=' font-bold'>{props.username}</p>
          <div className=' w-px h-8 bg-light-gray'></div>
          <Link to='/login' onClick={props.onLogout} id='dashboardLogout'>
            {t('log_out')}
          </Link>
        </li>
        <li className='flex items-center'>
          <Burger
            className='flex items-center justify-center md:hidden cursor-pointer'
            onOpen={sidebarOpenHandler}
          />
        </li>
      </ul>
      {sidebarIsOpen && (
        <MobileSidebar
          username={props.username}
          onLogout={props.onLogout}
          onSidebarClose={sidebarCloseHandler}
        />
      )}
    </div>
  );
};

export default React.memo(Navbar);
