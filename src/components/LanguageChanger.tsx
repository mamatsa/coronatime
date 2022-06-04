import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageChanger = () => {
  const { i18n } = useTranslation();
  return (
    <select
      name='language'
      id='language'
      className='bg-gray-50 border border-gray-300 text-sm rounded-xl focus:border-main-green px-4 outline-none '
      value={i18n.language}
      onChange={(e) => {
        i18n.changeLanguage(e.target.value);
      }}
    >
      <option value='en'>English</option>
      <option value='geo'>ქართული</option>
    </select>
  );
};

export default LanguageChanger;
