import { ButtonHTMLAttributes, HTMLProps } from "react";

export default function Button({
  children,
  ...resProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div>
      <button
        {...resProps}
        className={`text-md text-black bg-primary-hover text-center rounded-md px-4 py-1.5 ${resProps.className ?? ''}`}
      >
        {children}
      </button>
    </div>
  );
}

// export function Button(props: HTMLProps<HTMLButtonElement>) {
//   return (
//     <button
//       onClick={props.onClick}
//       disabled={props.disabled}
//       className={`tracking-wide text-lg text-white rounded-lg py-1.5 px-4 ${props.className ?? props.className
//         } `}
//     >
//       {props.children}
//     </button>
//   );
// }

export function GradientButton(props: HTMLProps<HTMLButtonElement>) {
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`tracking-wide text-lg text-white rounded-lg py-1.5 px-4 enabled:bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 outline-none hover:bg-400p hover:animate-gradient ${props.className ?? props.className
        } `}
    >
      {props.children}
    </Button>
  );
}