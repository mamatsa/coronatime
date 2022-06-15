import React from 'react';
import { ErrorMark } from 'components/svg';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';

let hasTip: boolean = false;

const Input: React.FC<{
  id: string;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  register?: UseFormRegister<any>;
  minLength?: number;
  customValidation?: { func: () => boolean; message: string };
  errors?: FieldErrors;
  isDirty?: boolean | undefined;
  tip?: string;
}> = (props) => {
  if (props.errors) {
    hasTip = !props.errors[props.name] && !props.isDirty;
  }

  const { t } = useTranslation();

  let register = {};
  if (props.register) {
    register = {
      ...props.register(props.name, {
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
          value: props.minLength ?? 0,
          message: 'errors.min_symbols',
        },
        validate: props.customValidation?.func,
      }),
    };
  }

  return (
    <div className={'flex flex-col'}>
      <label htmlFor={props.id} className=' font-bold'>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...register}
        className={`px-6 py-4 mt-2 text-black border-dark-brown border-[1px] rounded-lg w-full outline-main-blue ${
          props.errors &&
          props.isDirty &&
          !props.errors[props.name] &&
          ' border-main-green outline-main-green  bg-input-success bg-no-repeat bg-[center_right_2rem]'
        } ${
          props.errors &&
          props.errors[props.name] &&
          'border-error-red outline-error-red'
        }`}
      />

      <p
        className={` flex gap-2  mt-1 h-6 text-sm font-medium ${
          hasTip ? ' text-grayish' : 'text-error-red'
        } `}
        id={`${props.id}InputError`}
      >
        {hasTip && props.tip}
        {props.errors &&
          (props.errors[props.name]?.message ||
            props.errors[props.name]?.type === 'validate') && <ErrorMark />}
        {props.errors &&
          t(props.errors[props.name]?.message, { symbols: props.minLength })}
        {props.errors &&
          props.errors[props.name]?.type === 'validate' &&
          props.customValidation &&
          t(props.customValidation.message)}
      </p>
    </div>
  );
};

export default Input;
