import React from 'react';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { loginRequest } from 'services';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginForm, LoginComponent } from 'types';
import { Input, Button, AuthWrapper } from 'components';
import { Checkbox } from 'pages/Login/components';

const Login: React.FC<LoginComponent> = (props) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<LoginForm>({
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

  const onSubmit: SubmitHandler<LoginForm> = (data) =>
    loginHandler(data.username, data.password);

  return (
    <AuthWrapper
      welcomeText={t('login.welcome')}
      pageInfo={t('login.enter_info')}
      welcomeId='loginWelcome'
    >
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
          <Checkbox />
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
    </AuthWrapper>
  );
};

export default Login;
