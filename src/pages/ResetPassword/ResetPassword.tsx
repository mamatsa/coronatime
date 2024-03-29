import { useTranslation } from 'react-i18next';
import { passwordRecoveryRequest } from 'services';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RecoverPasswordForm } from 'types';
import { Button, Input, AuthNavbar } from 'components';

const ResetPassword = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<RecoverPasswordForm>({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<RecoverPasswordForm> = (data) =>
    recoverPassword(data.password, data.password2);

  const passwordsMatch = () => {
    return watch('password') === watch('password2');
  };

  const navigate = useNavigate();
  const location = useLocation();

  const recoverPassword = async (password: string, repeatPassword: string) => {
    const queryParams = new URLSearchParams(location.search);
    const hash = queryParams.get('hash');
    if (!hash) {
      navigate('/login');
    }
    try {
      await passwordRecoveryRequest(password, repeatPassword, hash);
    } catch (error) {
      setError('password', {
        type: 'custom',
        message: 'errors.password_recovery_problem',
      });
    }
  };

  return (
    <div className=' w-full h-screen flex flex-col items-center py-10 px-5'>
      <AuthNavbar />
      <div className='flex flex-col justify-center items-center h-3/4 gap-16 w-full xs:w-auto'>
        <h2 className=' font-black text-[25px]'>{t('reset_password.title')}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col'
        >
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
            key={3}
            isDirty={dirtyFields.password}
          />
          <Input
            label={t('repeat_password')}
            id='password2'
            name='password2'
            minLength={3}
            placeholder={t('repeat_password')}
            required={true}
            type='password'
            register={register}
            errors={errors}
            key={4}
            isDirty={dirtyFields.password2}
            customValidation={{
              func: passwordsMatch,
              message: t('passwords_should_match'),
            }}
          />
          <Button
            text={t('reset_password.button_text')}
            id='resetPasswordButton'
            classes='absolute bottom-10 left-5 right-5 xs:static'
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
