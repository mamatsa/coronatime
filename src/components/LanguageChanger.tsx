import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';

const LanguageChanger: React.FC<{ dashboard?: boolean }> = (props) => {
  const { i18n } = useTranslation();

  const languageChangeHandler = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Menu
      as='div'
      className='relative inline-block text-left'
      id='languageChanger'
    >
      <div>
        <Menu.Button
          type='button'
          className={
            props.dashboard
              ? ' bg-white box-border cursor-pointer flex justify-center items-center'
              : 'inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
          }
        >
          {i18n.language === 'en' ? 'English' : 'ქართული'}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </Menu.Button>
      </div>

      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <div className='py-1' role='none'>
          <Menu.Item>
            <p
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer ${
                i18n.language === 'en'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 '
              }`}
              onClick={() => languageChangeHandler('en')}
            >
              English
            </p>
          </Menu.Item>
          <Menu.Item>
            <p
              className={`text-gray-700 block px-4 py-2 text-sm cursor-pointer  ${
                i18n.language === 'geo'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 '
              }  `}
              onClick={() => languageChangeHandler('geo')}
            >
              ქართული
            </p>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default LanguageChanger;
