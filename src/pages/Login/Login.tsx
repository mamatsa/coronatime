import React from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { loginRequest } from 'services/backendRequestsService';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button, AuthNavbar } from 'components';
import { Vaccine } from 'assets/images';

type FormInputs = {
  username: string;
  password: string;
  remember: string;
};

const Login: React.FC<{
  onLogin: (userToken: string, userName: string) => void;
}> = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const navigate = useNavigate();

  const loginHandler = async (username: string, password: string) => {
    try {
      const token = await loginRequest(username, password);
      props.onLogin(token, watch('username'));
      navigate('/');
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      if (status === 422) {
        setError('username', {
          type: 'custom',
          message: 'errors.wrong_user',
        });
      } else if (status === 401) {
        setError('password', {
          type: 'custom',
          message: 'errors.wrong_password',
        });
      }
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    loginHandler(data.username, data.password);

  return (
    <div className=' flex flex-row justify-between'>
      <div className=' px-5 py-10 w-full md:px-28 md:w-3/4 2xl:w-2/5'>
        <AuthNavbar />
        <h2 className=' font-black text-2xl mt-16' id='loginWelcome'>
          {t('login.welcome')}
        </h2>
        <p className=' text-xl text-grayish my-4'>{t('login.enter_info')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t('username')}
            id='username'
            name='username'
            minLength={3}
            placeholder={t('login.username_placeholder')}
            required={true}
            type='text'
            register={register}
            errors={errors}
            key={1}
            isDirty={dirtyFields.username}
          />
          <Input
            label={t('password')}
            id='password'
            name='password'
            minLength={3}
            placeholder={t('password_placeholder')}
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={2}
            isDirty={dirtyFields.password}
          />
          <div className=' flex justify-between mb-6'>
            <div className=' flex items-center'>
              <input
                type='checkbox'
                id='remember'
                value={'remembered'}
                {...register('remember')}
                className='w-4 h-4 accent-green-600'
              />
              <label htmlFor='remember' className=' text-sm font-semibold ml-2'>
                {t('login.remember_device')}
              </label>
            </div>
            <Link
              to='/password'
              className=' text-sm text-main-blue font-semibold'
              id='loginForgotPassword'
            >
              {t('login.forgot_password')}
            </Link>
          </div>
          <Button text={t('log_in')} id='loginSubmit' />
        </form>
        <div className='w-full flex justify-center items-center gap-2 my-6 '>
          <p className=' text-grayish'>{t('login.dont_have_account')}</p>
          <Link to='/register' className='font-bold' id='loginGoToRegister'>
            {t('login.sign_up_free')}
          </Link>
        </div>
      </div>
      <img src={Vaccine} alt='vaccine' className=' hidden xl:block h-screen' />
    </div>
  );
};

export default Login;
