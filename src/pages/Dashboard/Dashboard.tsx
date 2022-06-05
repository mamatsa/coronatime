import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Navbar, StatisticSwitch } from 'pages/Dashboard/components';
import {
  NewCasesLine,
  RecoveredLine,
  DeathLine,
} from 'pages/Dashboard/components/svg';

const baseURL: string = 'https://coronatime-api.devtest.ge/api/countries';

type Statistics = {
  confirmed: number;
  recovered: number;
  deaths: number;
};

const Dashboard: React.FC<{
  username: string | null;
  token: string;
  onLogout: () => void;
}> = (props) => {
  const { t } = useTranslation();

  const [statistics, setStatistics] = useState<Statistics>();

  const countStatistics = (data: any) => {
    let totalConfirmed: number = 0;
    let totalRecovered: number = 0;
    let totalDeaths: number = 0;

    for (let i = 0; i < data.length; i++) {
      totalConfirmed += data[i].statistics.confirmed;
      totalRecovered += data[i].statistics.recovered;
      totalDeaths += data[i].statistics.deaths;
    }
    setStatistics({
      confirmed: totalConfirmed,
      recovered: totalRecovered,
      deaths: totalDeaths,
    });
  };

  React.useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${props.token}`,
        },
      })
      .then((response) => {
        countStatistics(response.data);
      })
      .catch((error) => {
        console.log(props.token);
        console.log(error);
      });
  }, [props.token]);

  return (
    <div className=' py-4 px-6  md:py-10 md:px-28'>
      <Navbar username={props.username} onLogout={props.onLogout} />
      <h1 className=' font-bold text-[25px]'>{t('dashboard.title')}</h1>
      <StatisticSwitch />

      <div className='80vw h-px mt-4 bg-border-gray'></div>
      <div className='flex flex-wrap gap-6 my-10 lg:flex-nowrap'>
        <div className='flex flex-col items-center justify-center gap-6 w-full py-10 px-28 bg-light-purple rounded-2xl lg:w-1/3'>
          <NewCasesLine />
          <p className=' whitespace-nowrap font-medium  md:text-xl'>
            {t('dashboard.new_cases')}
          </p>
          <p className=' text-main-purple font-black text-[25px] md:text-[39px]'>
            {statistics?.confirmed.toLocaleString()}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-6 w-full py-10 px-28 bg-light-green rounded-2xl lg:w-1/3 '>
          <RecoveredLine />
          <p className='font-medium  md:text-xl'>{t('dashboard.recovered')}</p>
          <p className=' text-main-green font-black text-[25px] md:text-[39px]'>
            {statistics?.recovered.toLocaleString()}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-6 w-full py-10 px-28 bg-light-yellow rounded-2xl lg:w-1/3'>
          <DeathLine />
          <p className='font-medium md:text-xl'>{t('dashboard.deaths')}</p>
          <p className=' text-main-yellow font-black text-[25px] md:text-[39px]'>
            {statistics?.deaths.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
