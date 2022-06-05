import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Navbar, StatisticSwitch } from 'pages/Dashboard/components';
import { WorldwideStatistics } from './components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, SelectChosen } from './components/svg';

const baseURL: string = 'https://coronatime-api.devtest.ge/api/countries';

type Statistics = {
  confirmed: number;
  recovered: number;
  deaths: number;
};

let prevSortOption: string = 'location';

const Dashboard: React.FC<{
  username: string | null;
  token: string;
  onLogout: () => void;
}> = (props) => {
  const { t, i18n } = useTranslation();

  const language = i18n.language === 'geo' ? 'ka' : 'en';

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
      })
      .catch((error) => {
        console.log(props.token);
        console.log(error);
      });
  }, [props.token]);

  const navigate = useNavigate();
  const location = useLocation();

  // get url search parameter for sorting
  const queryParams = new URLSearchParams(location.search);
  const sortOption = queryParams.get('sort') || 'location';

  // sort if sort param changes in url search params
  if (countries && prevSortOption !== sortOption) {
    prevSortOption = sortOption;
    switch (sortOption) {
      case 'cases':
        setCountries((prevState: any) => {
          return prevState.sort(
            (a: any, b: any) => b.statistics.confirmed - a.statistics.confirmed
          );
        });
        break;
      case 'deaths':
        setCountries((prevState: any) => {
          return prevState.sort(
            (a: any, b: any) => b.statistics.deaths - a.statistics.deaths
          );
        });
        break;
      case 'recovered':
        setCountries((prevState: any) => {
          return prevState.sort(
            (a: any, b: any) => b.statistics.recovered - a.statistics.recovered
          );
        });
        break;
      case 'location':
        setCountries((prevState: any) => {
          return prevState.sort((a: any, b: any) =>
            a.name[language] > b.name[language] ? 1 : -1
          );
        });
        break;
      default:
        break;
    }
  }

  // check what kind of statistics user want to see
  const isWorldwide: boolean = location.pathname === '/';

  // add search param on url on sort option choose
  const sortOptionClickHandler = (option: string) => {
    navigate(`${location.pathname}?sort=${option}`);
  };

  return (
    <div className=' py-4 px-6  md:py-10 md:px-28'>
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

      {!isWorldwide && countries && (
        <table className=' mt-5 w-full text-sm text-left border border-border-gray text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-border-gray'>
            <tr>
              <th scope='col' className='px-6 py-5'>
                <div
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    sortOptionClickHandler('location');
                  }}
                >
                  Location
                  {sortOption === 'location' ? <SelectChosen /> : <Select />}
                </div>
              </th>
              <th scope='col' className='px-6 py-5  items-center gap-2'>
                <div
                  className=' flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    sortOptionClickHandler('cases');
                  }}
                >
                  New cases
                  {sortOption === 'cases' ? <SelectChosen /> : <Select />}
                </div>
              </th>
              <th scope='col' className='px-6 py-5'>
                <div
                  className=' flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    sortOptionClickHandler('deaths');
                  }}
                >
                  Deaths
                  {sortOption === 'deaths' ? <SelectChosen /> : <Select />}
                </div>
              </th>
              <th scope='col' className='px-6 py-5'>
                <div
                  className=' flex items-center gap-2 cursor-pointer'
                  onClick={() => {
                    sortOptionClickHandler('recovered');
                  }}
                >
                  Recovered
                  {sortOption === 'recovered' ? <SelectChosen /> : <Select />}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country: any) => {
              return (
                <tr
                  key={country['_id']}
                  className=' border-b border-border-gray hover:bg-gray-50'
                >
                  <td className='px-6 py-4'>{country.name[language]}</td>
                  <td className='px-6 py-4'>{country.statistics.confirmed}</td>
                  <td className='px-6 py-4'>{country.statistics.deaths}</td>
                  <td className='px-6 py-4'>{country.statistics.recovered}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
