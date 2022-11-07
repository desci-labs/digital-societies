import { ButtonHTMLAttributes, HTMLProps } from "react";

export default function Button({
  children,
  ...resProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...resProps}
      className={`text-md text-black text-center rounded-md px-4 py-1.5 focus:outline-primary transition-all duration-200 ${
        resProps.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

export function GradientButton(props: HTMLProps<HTMLButtonElement>) {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`tracking-wide text-lg text-darker rounded-lg py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient ${
        props.className ?? props.className
      }`}
    >
      {props.children}
    </Button>
  );
}
