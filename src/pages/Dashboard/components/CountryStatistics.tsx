import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select, SelectChosen } from 'pages/Dashboard/components/svg';

let prevSortOption: string = 'location';

const CountryStatistics: React.FC<{ countries: any }> = (props) => {
  const { i18n } = useTranslation();
  const language = i18n.language === 'geo' ? 'ka' : 'en';

  const [countries] = useState<any>(props.countries);
  const [filteredCountries, setFilteredCountries] = useState<any>(
    props.countries
  );
  const [searchText, setSearchText] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();
  // add search param on url on sort option choose
  const sortOptionClickHandler = (option: string) => {
    navigate(`${location.pathname}?sort=${option}`);
  };

  // get url search parameter for sorting
  const queryParams = new URLSearchParams(location.search);
  const sortOption = queryParams.get('sort') || 'location';

  // sort if sort param changes in url search params
  if (countries && prevSortOption !== sortOption) {
    prevSortOption = sortOption;
    switch (sortOption) {
      case 'cases':
        setFilteredCountries((prevState: any) => {
          return prevState.sort(
            (a: any, b: any) => b.statistics.confirmed - a.statistics.confirmed
          );
        });
        break;
      case 'deaths':
        setFilteredCountries((prevState: any) => {
          return prevState.sort(
            (a: any, b: any) => b.statistics.deaths - a.statistics.deaths
          );
        });
        break;
      case 'recovered':
        setFilteredCountries((prevState: any) => {
          return prevState.sort(
            (a: any, b: any) => b.statistics.recovered - a.statistics.recovered
          );
        });
        break;
      case 'location':
        setFilteredCountries((prevState: any) => {
          return prevState.sort((a: any, b: any) =>
            a.name[language] > b.name[language] ? 1 : -1
          );
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (searchText !== '') {
      setFilteredCountries(
        countries.filter((country: any) => {
          const countryName =
            language === 'en' ? country.name.en.toLowerCase() : country.name.ka;
          const countryNameTranslated =
            language === 'ka' ? country.name.en.toLowerCase() : country.name.ka;
          return (
            countryName.includes(searchText) ||
            countryNameTranslated.includes(searchText)
          );
        })
      );
    } else {
      setFilteredCountries(countries);
    }
  }, [searchText, language, countries]);

  return (
    <>
      <input
        type='text'
        placeholder='Search by country'
        className=' py-4 pr-4 pl-14 my-8 border border-light-gray rounded-lg text-sm bg-input-search bg-no-repeat bg-[center_left_1.2rem]'
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value.toLowerCase());
        }}
      />
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
          {filteredCountries.map((country: any) => {
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
    </>
  );
};

export default CountryStatistics;
