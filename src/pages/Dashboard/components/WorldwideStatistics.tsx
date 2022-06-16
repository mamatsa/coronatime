import React from 'react';
import { useTranslation } from 'react-i18next';
import { Statistics } from 'types';
import {
  NewCasesLine,
  RecoveredLine,
  DeathLine,
} from 'pages/Dashboard/components';

const WorldwideStatistics: React.FC<{
  statistics: Statistics;
}> = (props) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-wrap gap-6 my-10 lg:flex-nowrap'>
      <div className='flex flex-col items-center justify-center gap-6 w-full py-10 px-28 bg-light-purple rounded-2xl lg:w-1/3'>
        <NewCasesLine />
        <p className=' whitespace-nowrap font-medium  md:text-xl'>
          {t('dashboard.new_cases')}
        </p>
        <p className=' text-main-purple font-black text-[25px] md:text-[39px]'>
          {props.statistics.confirmed.toLocaleString()}
        </p>
      </div>
      <div className='flex flex-col items-center justify-center gap-6 w-full py-10 px-28 bg-light-green rounded-2xl lg:w-1/3 '>
        <RecoveredLine />
        <p className='font-medium  md:text-xl'>{t('dashboard.recovered')}</p>
        <p className=' text-main-green font-black text-[25px] md:text-[39px]'>
          {props.statistics.recovered.toLocaleString()}
        </p>
      </div>
      <div className='flex flex-col items-center justify-center gap-6 w-full py-10 px-28 bg-light-yellow rounded-2xl lg:w-1/3'>
        <DeathLine />
        <p className='font-medium md:text-xl'>{t('dashboard.deaths')}</p>
        <p className=' text-main-yellow font-black text-[25px] md:text-[39px]'>
          {props.statistics.deaths.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default WorldwideStatistics;
