import { forwardRef, HTMLProps, PropsWithChildren } from "react";

export type InputRowProps = PropsWithChildren<{ htmlFor: string; label?: string; className?: string }>;

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
  return <span className="text-lg cursor-pointer font-semibold capitalize">{text}</span>;
}
