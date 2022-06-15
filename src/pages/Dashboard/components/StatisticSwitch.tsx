import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const StatisticSwitch = () => {
  const { t } = useTranslation();

  return (
    <ul className='flex gap-8 mt-10'>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'font-bold border-b-[3px] border-black pb-4' : undefined
          }
          id='dashboardWorldwideNavLink'
        >
          {t('dashboard.worldwide')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/by-country'
          className={({ isActive }) =>
            isActive ? 'font-bold border-b-[3px] border-black pb-4' : undefined
          }
          id='dashboardCountriesNavLink'
        >
          {t('dashboard.by_country')}
        </NavLink>
      </li>
    </ul>
  );
};

export default React.memo(StatisticSwitch);
