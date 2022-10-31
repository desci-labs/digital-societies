import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, HTMLProps, useMemo } from "react";

const getClassName = ({
  className,
  activeClassName,
  isActive,
}: {
  className: string;
  activeClassName: string;
  isActive: boolean;
}) => {
  return `text-darker hover:text-neutrals-gray-3 dark:hover:text-neutrals-gray-7 border-b-2 border-transparent hover:border-black dark:hover:border-white ${className} ${isActive ? `dark:text-white font-bold ${activeClassName}` : ""
    }`;
};

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
        className={getClassName({ className: props.className!, activeClassName: props.activeClassName!, isActive })}
      >
        {props.children}
      </a>
    </Link>
  );
}

export function ExternalLink(props: HTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  href: string;
  activeClassName?: string;
}) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className={getClassName({ className: props.className!, activeClassName: props.activeClassName!, isActive: false })}
    >
      {props.children}
    </a>
  );
}