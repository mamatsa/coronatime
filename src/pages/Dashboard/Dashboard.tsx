import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'pages/Dashboard/components';

const Dashboard: React.FC<{ username: string | null; onLogout: () => void }> = (
  props
) => {
  const { t } = useTranslation();
  const activeClass = 'font-bold border-b-[3px] border-black pb-4';
  return (
    <div className='  py-10 px-28'>
      <Navbar username={props.username} onLogout={props.onLogout} />
      <h1 className=' font-bold text-[25px]'>{t('dashboard.title')}</h1>
      <ul className='flex gap-8 mt-10'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            {t('dashboard.worldwide')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/by-country'
            className={({ isActive }) => (isActive ? activeClass : undefined)}
          >
            {t('dashboard.by_country')}
          </NavLink>
        </li>
      </ul>
      <div className='80vw h-px mt-4 bg-border-gray'></div>
    </div>
  );
};

export default Dashboard;
