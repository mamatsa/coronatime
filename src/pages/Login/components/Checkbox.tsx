import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();

  return (
    <div className='flex justify-center'>
      <div className='form-check flex items-center'>
        <input
          className={`form-check-input ${
            !isChecked && ' appearance-none'
          } h-4 w-4 border border-gray-300 rounded-sm bg-white focus:outline-none transition duration-200 mr-2 cursor-pointer accent-green-600 `}
          type='checkbox'
          id='loginCheckbox'
          onChange={() => {
            setIsChecked((prevState) => {
              return !prevState;
            });
          }}
        />
        <label
          className='form-check-label text-sm font-semibold'
          htmlFor='loginCheckbox'
        >
          {t('login.remember_device')}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
