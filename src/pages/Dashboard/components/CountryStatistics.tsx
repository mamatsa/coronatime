import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SelectOption } from 'pages/Dashboard/components/svg';
import { t } from 'i18next';

// helps to find out if sort option have changed
let prevSortOption: string = 'location';
let prevSortOrder: string = 'desc';

const CountryStatistics: React.FC<{
  countries: any;
}> = (props) => {
  console.log(1);
  const { i18n } = useTranslation();
  const language = i18n.language === 'geo' ? 'ka' : 'en';

  const [searchParams, setSearchParams] = useSearchParams();

  const [countries] = useState<any>(props.countries);
  const [filteredCountries, setFilteredCountries] = useState<any>(
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
        setFilteredCountries((prevState: any) => {
          return prevState.sort((a: any, b: any) => {
            if (sortOrder === 'asc')
              return a.statistics.confirmed - b.statistics.confirmed;
            return b.statistics.confirmed - a.statistics.confirmed;
          });
        });
        break;
      case 'deaths':
        setFilteredCountries((prevState: any) => {
          return prevState.sort((a: any, b: any) => {
            if (sortOrder === 'asc')
              return a.statistics.deaths - b.statistics.deaths;
            return b.statistics.deaths - a.statistics.deaths;
          });
        });
        break;
      case 'recovered':
        setFilteredCountries((prevState: any) => {
          return prevState.sort((a: any, b: any) => {
            if (sortOrder === 'asc')
              return a.statistics.recovered - b.statistics.recovered;
            return b.statistics.recovered - a.statistics.recovered;
          });
        });
        break;
      case 'location':
        setFilteredCountries((prevState: any) => {
          return prevState.sort((a: any, b: any) => {
            if (sortOrder === 'asc')
              return a.name[language] > b.name[language] ? 1 : -1;

            return a.name[language] < b.name[language] ? 1 : -1;
          });
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
    // Causes resorting, because otherwise on search word change previous sort option would be lost
    prevSortOption = '';
  }, [searchText, language, countries]);

  return (
    <div className=' flex flex-col items-center'>
      <input
        type='text'
        placeholder='Search by country'
        className=' py-3 pl-14 mb-2 mt-6 border border-light-gray rounded-lg text-xs bg-input-search bg-no-repeat bg-[center_left_1.2rem] md:my-8 md:text-base md:py-4 self-start'
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value.trim().toLowerCase());
        }}
      />
      <table className=' mt-5 w-full text-sm text-left border border-border-gray text-gray-500 -mx-5'>
        <thead className='text-[8px] md:text-sm text-gray-700 uppercase bg-border-gray'>
          <tr>
            <th scope='col' className=' px-0.5 md:px-6 py-5'>
              <div
                className='flex items-center gap-1 md:gap-2 cursor-pointer'
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
            <th
              scope='col'
              className=' px-0.5 md:px-6 py-5  items-center gap-2'
            >
              <div
                className=' flex items-center gap-1 md:gap-2 cursor-pointer'
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
            <th scope='col' className=' px-0.5 md:px-6 py-5'>
              <div
                className=' flex items-center gap-1 md:gap-2 cursor-pointer'
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
            <th scope='col' className=' px-0.5 md:px-6 py-5'>
              <div
                className=' flex items-center gap-1 md:gap-2 cursor-pointer'
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
        <tbody>
          {filteredCountries.map((country: any) => {
            return (
              <tr
                key={country['_id']}
                className=' border-b border-border-gray hover:bg-gray-50'
              >
                <td className='px-1 md:px-6 py-4 text-xs md:text-base'>
                  {country.name[language]}
                </td>
                <td className='px-1 md:px-6  py-4 text-xs md:text-base'>
                  {country.statistics.confirmed}
                </td>
                <td className='px-1 md:px-6  py-4 text-xs md:text-base'>
                  {country.statistics.deaths}
                </td>
                <td className='px-1 md:px-6  py-4 text-xs md:text-base'>
                  {country.statistics.recovered}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CountryStatistics;
