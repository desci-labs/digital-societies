import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, HTMLProps } from "react";

export default function NavLink(
  props: HTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>> & {
    href: string;
    activeClassName?: string;
  }
) {
  const router = useRouter();
  return (
    <Link href={props.href}>
      <a
        className={`font-semibold text-regent-gray text-lg hover:text-dark capitalize ${
          router.pathname === props.href ? props.activeClassName : ""
        }`}
      >
        {props.children}
      </a>
    </Link>
  );
}
