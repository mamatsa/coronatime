import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Navbar, StatisticSwitch } from 'pages/Dashboard/components';
import { WorldwideStatistics } from 'pages/Dashboard/components';
import { useLocation } from 'react-router-dom';
import { CountryStatistics } from 'pages/Dashboard/components';

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
  const [countries, setCountries] = useState<any>();

  // calculate worldwide statistics
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

  // fetch countries list
  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${props.token}`,
        },
      })
      .then((response) => {
        countStatistics(response.data);
        setCountries(response.data);
      });
  }, [props.token]);

  const location = useLocation();

  // check what kind of statistics user want to see
  const isWorldwide: boolean = location.pathname === '/';

  return (
    <div className=' py-4 px-2 md:py-10 sm:px-6 lg:px-20 xl:px-28'>
      <Navbar username={props.username} onLogout={props.onLogout} />
      <h1 className=' font-bold text-[25px]'>
        {isWorldwide
          ? t('dashboard.worldwide_title')
          : t('dashboard.country_title')}
      </h1>
      <StatisticSwitch />

      <div className='80vw h-px mt-4 bg-border-gray'></div>

      {statistics && isWorldwide && (
        <WorldwideStatistics statistics={statistics} />
      )}

      {!isWorldwide && countries && <CountryStatistics countries={countries} />}
    </div>
  );
};

export default Dashboard;
