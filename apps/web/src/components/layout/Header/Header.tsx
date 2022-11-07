import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DesocIcon, MenuIcon } from "assets/svg";
import TransactionHint from "components/TransactionStatus/TransactionHint";
import Button from "components/UI/Button/Index";
import NavLink, { ExternalLink } from "components/UI/NavLink";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useMobileMenu, useSetMobileMenu } from "./useAppMenu";
import useDashboard from "hooks/useDashboard";
import Link from "next/link";
import Icon from "components/Icons/Icons";

export default function Header() {
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);
  const { showDashboard, org } = useDashboard();

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <nav className="container mx-auto flex items-center justify-start p-4 relative">
      <div className="grow flex items-center justify-start gap-5">
        <Link href="/">
          <a className="cursor-pointer">
            <DesocIcon width="15" heigth="15" />
          </a>
        </Link>
        <NavLink href="/" className="hidden sm:block">
          Explore
        </NavLink>
        <ExternalLink href="https://sbt.desci.com/" className="hidden sm:block">
          Forum
        </ExternalLink>
        {showDashboard && (
          <NavLink
            href={`/dashboard/${org?.address}`}
            className="hidden sm:block"
          >
            Dashboard
          </NavLink>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {!hide && !showDashboard && (
          <NavLink
            href="/launch"
            activeClassName="dark:border-white border-black text-black dark:text-white"
            className="text-sm border border-regent-gray text-neutrals-gray-5 hover:text-neutrals-gray-1 dark:hover:text-neutrals-gray-7 p-2 duration-200"
          >
            Launch an organisation
          </NavLink>
        )}
        <TransactionHint />
        <div className="hidden sm:block">
          <ConnectButton showBalance={false} />
        </div>
        <ThemeTogger />
        <MenuTrigger />
      </div>
      <MobileMenu />
    </nav>
  );
}

function MenuTrigger() {
  const { toggleMenu } = useSetMobileMenu();
  return (
    <div className="sm:hidden flex items-center">
      <Button className="m-0" onClick={toggleMenu}>
        <MenuIcon />
      </Button>
    </div>
  );
}

function ThemeTogger() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-lg">
      <Button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "light" ? (
          <Icon type="FillMoon" size={20} fill="#142E0C" />
        ) : (
          <Icon
            type="FillBrightness"
            className="duration-300"
            color="#EDF492"
            size={20}
          />
        )}
      </Button>
    </div>
  );
}

function MobileMenu() {
  const opened = useMobileMenu();
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);
  const { org, showDashboard } = useDashboard();

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <div
      className={`z-50 pointer-none opacity-0 sm:hidden mobile-menu absolute left-0 right-0 top-[100%] bg-white dark:bg-dark dark:bg-gradient-to-b dark:from-rich-black dark:to-black transition-all overflow-hidden ${
        opened ? "pointer-click opacity-100" : "h-0"
      }`}
    >
      <ul className="responsive-nav transition-opacity duration-500">
        <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
          <NavLink href="/">Explore</NavLink>
        </li>

        {showDashboard && (
          <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
            <NavLink href={`/dashboard/${org?.address}`}>Dashboard</NavLink>
          </li>
        )}
        {!hide && !showDashboard && (
          <li className="block text-sm px-2 py-4 hover:bg-primary-over  hover:text-black transition duration-300">
            <NavLink
              href="/launch"
              activeClassName="dark:border-white border-black text-black dark:text-white"
              className="text-sm border border-regent-gray text-neutrals-gray-5 hover:text-neutrals-gray-1 dark:hover:text-neutrals-gray-7 p-2 duration-200"
            >
              Launch an organisation
            </NavLink>
          </li>
        )}
        <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
          <ConnectButton showBalance={false} />
        </li>
      </ul>
    </div>
  );
}
