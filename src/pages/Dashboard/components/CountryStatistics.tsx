import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SelectOption } from 'pages/Dashboard/components';
import { Country } from 'types';

// helps to find out if sort option have changed
let prevSortOption: string = 'location';
let prevSortOrder: string = 'desc';

const CountryStatistics: React.FC<{
  countries: Country[];
}> = (props) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'geo' ? 'ka' : 'en';

  const [searchParams, setSearchParams] = useSearchParams();

  const [countries] = useState<Country[]>(props.countries);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(
    props.countries
  );
  const [searchText, setSearchText] = useState<string>('');

  // get url search parameter for sorting
  const sortOption = searchParams.get('sort') || 'location';
  const sortOrder = searchParams.get('order') || 'asc';

  // add parameter on url when user chooses sort option
  const sortOptionClickHandler = (option: string) => {
    if (searchParams.get('sort') === option && sortOrder === 'desc') {
      setSearchParams({ sort: option, order: 'asc' });
    } else if (sortOption === option) {
      setSearchParams({ sort: option, order: 'desc' });
    } else {
      setSearchParams({ sort: option });
    }
  };

  // sort if url sort param changes
  if (
    countries &&
    (prevSortOption !== sortOption || prevSortOrder !== sortOrder)
  ) {
    prevSortOption = sortOption;
    prevSortOrder = sortOrder;
    switch (sortOption) {
      case 'cases':
        setFilteredCountries((prevState) => {
          return prevState.sort((a, b) => {
            if (sortOrder === 'asc')
              return a.statistics.confirmed - b.statistics.confirmed;
            return b.statistics.confirmed - a.statistics.confirmed;
          });
        });
        break;
      case 'deaths':
        setFilteredCountries((prevState) => {
          return prevState.sort((a, b) => {
            if (sortOrder === 'asc')
              return a.statistics.deaths - b.statistics.deaths;
            return b.statistics.deaths - a.statistics.deaths;
          });
        });
        break;
      case 'recovered':
        setFilteredCountries((prevState) => {
          return prevState.sort((a, b) => {
            if (sortOrder === 'asc')
              return a.statistics.recovered - b.statistics.recovered;
            return b.statistics.recovered - a.statistics.recovered;
          });
        });
        break;
      case 'location':
        setFilteredCountries((prevState) => {
          return prevState.sort((a, b) => {
            if (sortOrder === 'asc')
              return a.name[language] > b.name[language] ? 1 : -1;
            return a.name[language] < b.name[language] ? 1 : -1;
          });
        });
        break;
    }
  }

  useEffect(() => {
    if (searchText !== '') {
      setFilteredCountries(
        countries.filter((country) => {
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
    // Causes resorting, because otherwise on search word change previous sort option would be lost
    prevSortOption = '';
  }, [searchText, language, countries]);

  return (
    <div className=' flex flex-col items-center'>
      <input
        type='text'
        placeholder={t('dashboard.search_by_country')}
        className=' self-start py-3 pl-14 my-6 border border-light-gray rounded-lg text-xs bg-input-search bg-no-repeat bg-[center_left_1.2rem] md:my-8 md:text-base md:py-4'
        id='dashboardSearch'
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value.trim().toLowerCase());
        }}
      />
      <div className='w-full border rounded-lg overflow-hidden h-[calc(100vh-22rem)] md:h-[calc(100vh-28rem)]'>
        <table className='table-auto w-full h-full'>
          <thead className='bg-border-gray'>
            <tr className=' py-4 w-full h-full flex text-[8px] md:text-sm'>
              <th scope='col' className=' w-1/4 pl-1 md:pl-4 lg:pl-10'>
                <div
                  className='flex items-center justify-center flex-col gap-1 cursor-pointer sm:flex-row sm:justify-start md:gap-2 '
                  id='sortByLocation'
                  onClick={() => {
                    sortOptionClickHandler('location');
                  }}
                >
                  <>
                    {t('dashboard.location')}
                    {sortOption === 'location' ? (
                      <SelectOption order={sortOrder} />
                    ) : (
                      <SelectOption />
                    )}
                  </>
                </div>
              </th>
              <th scope='col' className='w-1/4'>
                <div
                  className=' flex items-center justify-center flex-col gap-1 cursor-pointer sm:flex-row sm:justify-start  md:gap-2 '
                  id='sortByCases'
                  onClick={() => {
                    sortOptionClickHandler('cases');
                  }}
                >
                  <>
                    {t('dashboard.new_cases')}
                    {sortOption === 'cases' ? (
                      <SelectOption order={sortOrder} />
                    ) : (
                      <SelectOption />
                    )}
                  </>
                </div>
              </th>
              <th scope='col' className=' w-1/4'>
                <div
                  className=' flex items-center justify-center flex-col gap-1  cursor-pointer sm:flex-row sm:justify-start  md:gap-2 '
                  id='sortByDeaths'
                  onClick={() => {
                    sortOptionClickHandler('deaths');
                  }}
                >
                  <>
                    {t('dashboard.deaths')}
                    {sortOption === 'deaths' ? (
                      <SelectOption order={sortOrder} />
                    ) : (
                      <SelectOption />
                    )}
                  </>
                </div>
              </th>
              <th scope='col' className=' w-1/4 pr-1 md:pr-4'>
                <div
                  className=' flex items-center justify-center flex-col gap-1  cursor-pointer sm:flex-row sm:justify-start md:gap-2 '
                  id='sortByRecovered'
                  onClick={() => {
                    sortOptionClickHandler('recovered');
                  }}
                >
                  <>
                    {t('dashboard.recovered')}
                    {sortOption === 'recovered' ? (
                      <SelectOption order={sortOrder} />
                    ) : (
                      <SelectOption />
                    )}
                  </>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className=' block h-full overflow-y-scroll'>
            {filteredCountries.map((country) => {
              return (
                <tr
                  key={country['_id']}
                  className=' w-full flex items-center border-b border-border-gray hover:bg-gray-50'
                >
                  <td className='w-1/4 px-2 py-4 text-[8px] text-center sm:text-left md:px-5 md:text-base lg:pl-10'>
                    {country.name[language]}
                  </td>
                  <td className='w-1/4  px-2 py-4 text-[10px] text-center sm:text-left md:text-base'>
                    {country.statistics.confirmed}
                  </td>
                  <td className='w-1/4 px-2 my-4 text-[10px] text-center sm:text-left md:text-base'>
                    {country.statistics.deaths}
                  </td>
                  <td className='w-1/4 px-3 py-4 text-[10px] text-center sm:text-left md:text-base'>
                    {country.statistics.recovered}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryStatistics;
