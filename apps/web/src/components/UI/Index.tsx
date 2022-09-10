import { HTMLProps } from "react";

export function ExternalLink(props: HTMLProps<HTMLAnchorElement>) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="w-full inline-block text-md border border-cornflower-blue hover:bg-cornflower-blue hover:text-white duration-200 text-center rounded-3xl px-3 py-1.5"
    >
      Visit website
    </a>
  );
}