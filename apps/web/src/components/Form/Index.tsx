import React, { forwardRef, HTMLProps, PropsWithChildren } from "react";

declare module "react" {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type InputRowProps = PropsWithChildren<{
  labelText?: string;
  label?: string;
  className?: string;
}>;

export function InputRow(props: InputRowProps) {
  return (
    <div
      className={`block flex flex-col gap-2 items-start mt-5 ${
        props.className ?? ""
      }`}
    >
      {props.labelText && (
        <LabelText label={props.label} text={props.labelText} />
      )}
      {props.children}
    </div>
  );
}

export function InputGrid(props: InputRowProps) {
  return (
    <div
      className={`grid gap-6 w-full md:grid-cols-2 mt-5 place-content-between ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  ({ className, ...restProps }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`py-1.5 px-4 w-full rounded-xl border border-neutrals-gray-3 focus:border-neutrals-gray-5 bg-transparent text-darker my-1 outline-none ${className}`}
        {...restProps}
      />
    );
  }
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      className="w-full bg-transparent outline-none text-darker border border-neutrals-gray-3 focus:border-neutrals-gray-5 p-2 rounded-xl appearance-none resize-none h-20"
      {...props}
    />
  );
});

export function LabelText({
  text,
  label,
  classes,
}: {
  text: string;
  label?: string;
  classes?: string;
}) {
  return (
    <label
      className={`text-lg text-darker cursor-pointer font-semibold capitalize ${
        classes ?? ""
      }`}
      htmlFor={label}
    >
      {text}
    </label>
  );
}

type SelectInputProps<T> = {
  className?: string;
  options: T[];
  getOptionLabel: (option: T) => string | number;
  getOptionValue: (option: T) => string | number;
};

function Select<T>(
  { options, getOptionLabel, getOptionValue, ..._props }: SelectInputProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <select
      ref={ref}
      {..._props}
      className={`bg-transparent border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
        _props.className ?? ""
      }`}
    >
      {options.map((data, i) => (
        <option key={i} value={getOptionValue(data)}>
          {getOptionLabel(data)}
        </option>
      ))}
    </select>
  );
}
export const SelectInput = React.forwardRef(Select);

type RadioInputProps = {
  className?: string;
  value: string | number;
  title?: string;
  subTitle?: string;
  defaultChecked?: boolean;
  id: string;
  Icon?: JSX.Element;
};

function Radio(
  { id, Icon, className, value, title, subTitle, ..._props }: RadioInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={className ?? ""}>
      <input
        ref={ref}
        {..._props}
        id={id}
        type="radio"
        defaultValue={value}
        className="hidden peer"
        required
      />
      <label
        htmlFor={id}
        className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-tint-primary peer-checked:border-tint-primary peer-checked:text-tint-primary hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="block">
          {title && <div className="w-full text-lg font-semibold">{title}</div>}
          {subTitle && <div className="w-full">{subTitle}</div>}
        </div>
        {Icon && Icon}
      </label>
    </div>
  );
}
export const RadioInput = forwardRef(Radio);

export type FormProps = { title?: string; description?: string };
export function Form(props: HTMLProps<HTMLFormElement> & FormProps) {
  return (
    <div
      className={`container mx-auto flex flex-col gap-5 py-8 mb-5 max-w-500 ${props.className}`}
    >
      {props.title && (
        <h1 className="text-3xl font-bold mt-5 text-center capitalize text-darker">
          {props.title}
        </h1>
      )}
      {props.description && (
        <span className="text-lg text-center font-normal text-darker capitalize">
          {props.description}
        </span>
      )}
      <div className="mx-auto flex justify-center w-full">
        <form className="w-full" onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  );
}
