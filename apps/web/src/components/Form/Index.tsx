import React, { forwardRef, HTMLProps, PropsWithChildren } from "react";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type InputRowProps = PropsWithChildren<{
  htmlFor: string;
  label?: string;
  className?: string;
}>;

export function InputRow(props: InputRowProps) {
  return (
    <label
      className={`block flex flex-col gap-2 items-start mt-5 ${props.className ?? ""
        }`}
      htmlFor={props.htmlFor}
    >
      {props.label && <LabelText text={props.label} />}
      {props.children}
    </label>
  );
}

export function Button(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`tracking-wide text-lg text-white rounded-lg py-1.5 px-4 ${props.className ?? props.className
        } `}
    >
      {props.children}
    </button>
  );
}
export function GradientButton(props: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`tracking-wide text-lg text-white rounded-lg py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient ${props.className ?? props.className
        } `}
    >
      {props.children}
    </button>
  );
}

export const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className="py-1.5 px-4 w-full rounded-xl border-2 focus:border-cornflower-blue my-1 outline-none"
        {...props}
      />
    );
  }
);

export function LabelText({ text }: { text: string }) {
  return (
    <span className="text-lg cursor-pointer font-semibold capitalize">
      {text}
    </span>
  );
}

type SelectInputProps<T> = {
  options: T[];
  getOptionLabel: (option: T) => string | number;
  getOptionValue: (option: T) => string | number;
}

function Select<T>(
  props: SelectInputProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {

  return (
    <select
      ref={ref}
      id="default"
      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {props.options.map((data, i) => (
        <option key={i} value={props.getOptionValue(data)}>
          {props.getOptionLabel(data)}
        </option>
      ))}
    </select>
  );
}

export const SelectInput = React.forwardRef(Select);

export type FormProps = { title?: string, description?: string };

export function Form(props: HTMLProps<HTMLFormElement> & FormProps) {

  return (
    <div className={`container mx-auto flex flex-col gap-5 py-8 max-w-500 bg-white ${props.className}`}>
      {props.title && <h1 className="text-3xl font-bold mt-5 text-center capitalize">{props.title}</h1>}
      {props.description && <span className="text-lg text-center font-normal text-regent-gray capitalize">{props.description}</span>}
      <div className="mx-auto flex justify-center w-120">
        <form className="w-full" onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  )
}