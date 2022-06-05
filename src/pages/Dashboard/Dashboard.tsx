import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'pages/Dashboard/components';
import { NewCasesLine, RecoveredLine, DeathLine } from 'components/svg';

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
      <div className='flex gap-6 my-10'>
        <div className='flex flex-col items-center justify-center gap-6 py-10 px-28 bg-light-purple w-2/6 rounded-2xl'>
          <NewCasesLine />
          <p className=' text-xl whitespace-nowrap font-medium'>New cases</p>
          <p className=' text-main-purple font-black text-[39px]'>
            {statistics?.confirmed.toLocaleString()}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-6 py-10 px-28 bg-light-green w-2/6  rounded-2xl'>
          <RecoveredLine />
          <p className=' text-xl font-medium'>Recovered</p>
          <p className=' text-main-green font-black text-[39px]'>
            {statistics?.recovered.toLocaleString()}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-6 py-10 px-28 bg-light-yellow w-2/6  rounded-2xl'>
          <DeathLine />
          <p className=' text-xl font-medium'>Deaths</p>
          <p className=' text-main-yellow font-black text-[39px]'>
            {statistics?.deaths.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
