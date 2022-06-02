import React from 'react';
import { ErrorMark } from 'components/svg';

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
  isDirty: boolean | undefined;
}> = (props) => {
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
            message: 'This field is required',
          },
          minLength: {
            value: props.minLength,
            message: `Enter min ${props.minLength} symbols`,
          },
          validate: props.customValidation?.func,
        })}
        className={`px-5 py-3 mt-2 text-black border-dark-brown border-[1px] rounded-lg w-full outline-main-blue ${
          props.isDirty &&
          !props.errors[props.name] &&
          ' border-main-green outline-main-green  bg-input-success bg-no-repeat bg-[center_right_2rem]'
        } ${props.errors[props.name] && 'border-error-red outline-error-red'}`}
      />
      {props.errors && (
        <p
          className=' flex gap-2 text-error-red mt-1 h-6 text-sm font-medium'
          id={`${props.id}InputError`}
        >
          {props.errors[props.name]?.message && <ErrorMark />}
          {props.errors[props.name]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
