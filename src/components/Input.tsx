import React from 'react';
import { ErrorMark } from 'components/svg';
import { useTranslation } from 'react-i18next';

const Input: React.FC<{
  id: string;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  register?: any;
  minLength?: number;
  customValidation?: any;
  errors?: any;
  isDirty?: boolean | undefined;
  tip?: string;
  t?: string;
}> = (props) => {
  const hasTip: boolean = !props.errors[props.name] && !props.isDirty;

  const { t } = useTranslation();

  return (
    <div className={'flex flex-col'}>
      <label htmlFor={props.id} className=' font-bold'>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name, {
          required: {
            value: props.required,
            message: 'errors.field_required',
          },

          ...(props.name === 'email' && {
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'errors.valid_email',
            },
          }),
          minLength: {
            value: props.minLength,
            message: 'errors.min_symbols',
          },
          validate: props.customValidation?.func,
        })}
        className={`px-5 py-3 mt-2 text-black border-dark-brown border-[1px] rounded-lg w-full outline-main-blue ${
          props.isDirty &&
          !props.errors[props.name] &&
          ' border-main-green outline-main-green  bg-input-success bg-no-repeat bg-[center_right_2rem]'
        } ${props.errors[props.name] && 'border-error-red outline-error-red'}`}
      />

      <p
        className={` flex gap-2  mt-1 h-6 text-sm font-medium ${
          hasTip ? ' text-grayish' : 'text-error-red'
        } `}
        id={`${props.id}InputError`}
      >
        {hasTip && props.tip}
        {(props.errors[props.name]?.message ||
          props.errors[props.name]?.type === 'validate') && <ErrorMark />}
        {t(props.errors[props.name]?.message, { symbols: props.minLength })}
        {props.errors[props.name]?.type === 'validate' &&
          t(props.customValidation.message)}
      </p>
    </div>
  );
};

export default Input;
