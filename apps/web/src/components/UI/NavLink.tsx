import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, HTMLProps, useMemo } from "react";

export default function NavLink(
  props: HTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>> & {
    href: string;
    activeClassName?: string;
  }
) {
  const router = useRouter();

  const isActive = useMemo(() => {
    if (router.pathname === props.href) return true;
    if (props.href === "/") return false;
    return (
      router.pathname.toLowerCase().search(props.href.toLowerCase()) !== -1
    );
  }, [props.href, router.pathname]);

  return (
    <Link href={props.href}>
      <a
        className={`font-normal hover:text-white ${props.className ?? ""} ${
          isActive ? props.activeClassName : ""
        }`}
      >
        {props.children}
      </a>
    </Link>
  );
}
