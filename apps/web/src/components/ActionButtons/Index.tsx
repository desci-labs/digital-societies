import Link from "next/link";
import { PropsWithChildren } from "react";

export function ActionButtonLink(props: { href: string, title: string }) {
  return (<div>
    <Link href={props.href}>
      <a href={props.href} className="text-md border border-cornflower-blue group-hover:border-white group-hover:text-white text-cornflower-blue mt-16 text-center rounded-3xl px-3 py-1.5">
        {props.title}
      </a>
    </Link>
  </div>);
}


export function ActionButtons(props: PropsWithChildren<{}>) {
  return (
    <div className="absolute top-0 right-0 bg-black bg-opacity-20 group-hover:opacity-100 group-hover:bg-opacity-50 h-full w-full z-10 p-5 flex gap-5 items-start justify-end">
      {props.children}
    </div>
  );
}
