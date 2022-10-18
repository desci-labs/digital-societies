import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DesocIcon, MenuIcon } from "assets/svg";
import TransactionHint from "components/TransactionStatus/TransactionHint";
import Button from "components/UI/Button/Index";
import NavLink from "components/UI/NavLink";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useMobileMenu, useSetMobileMenu } from "./useAppMenu";
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md'
import useDashboard from "hooks/useDashboard";

export default function Header() {
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);
  const { showDashboard } = useDashboard();

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <nav className="container mx-auto flex items-center justify-start p-4 relative">
      <div className="grow flex items-center justify-start gap-5">
        <DesocIcon width="15" heigth="15" />
        <NavLink
          href="/"
          activeClassName="border-b-2 border-white text-neutrals-gray-1 dark:text-white"
          className="hidden sm:block text-neutrals-gray-3 dark:text-neutrals-gray-5 hover:text-neutrals-gray-3 dark:hover:text-neutrals-gray-7 border-b-2 border-transparent hover:border-black dark:hover:border-white"
        >
          Explore
        </NavLink>
        {showDashboard && <NavLink
          href="/dasbhoard"
          activeClassName="border-b-2 border-white text-neutrals-gray-1 dark:text-white"
          className="hidden sm:block text-neutrals-gray-3 dark:text-neutrals-gray-5 hover:text-neutrals-gray-3 dark:hover:text-neutrals-gray-7 border-b-2 border-transparent hover:border-black dark:hover:border-white"
        >
          Dashboard
        </NavLink>}
      </div>
      <div className="flex gap-5 items-center">
        <TransactionHint />
        {!hide && (
          <NavLink
            href="/launch"
            activeClassName="dark:border-white border-black text-black dark:text-white"
            className="text-sm border border-regent-gray text-neutrals-gray-5 hover:text-neutrals-gray-1 dark:hover:text-neutrals-gray-7 p-2 duration-200"
          >
            Launch an organisation
          </NavLink>
        )}
        <div className="hidden sm:block">
          <ConnectButton showBalance={false} />
        </div>
        {/* <ThemeTogger /> */}
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
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex items-center rounded-lg">
      <Button>
        {resolvedTheme === 'dark' ? <MdOutlineLightMode className="duration-300" color="white" size={15} /> : <MdOutlineNightlight size={15} />}
      </Button>
    </div>
  );
}

function MobileMenu() {
  const opened = useMobileMenu();
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);
  const { showDashboard } = useDashboard();


  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <div
      className={`z-50 pointer-none opacity-0 sm:hidden mobile-menu absolute left-0 right-0 top-[100%] bg-white dark:bg-dark dark:bg-gradient-to-b dark:from-rich-black dark:to-black transition-all overflow-hidden ${opened ? "pointer-click opacity-100" : "h-0"
        }`}
    >
      <ul className="responsive-nav transition-opacity duration-500">
        <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
          <NavLink
            href="/"
            activeClassName="border-b-2 border-white text-black dark:text-white"
            className="text-neutrals-gray-3 dark:text-neutrals-gray-5 hover:text-neutrals-gray-3 dark:hover:text-neutrals-gray-7 border-b-2 border-transparent hover:border-black dark:hover:border-white"
          >
            Explore
          </NavLink>
        </li>

        {showDashboard && <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
          <NavLink
            href="/dashboard"
            activeClassName="border-b-2 border-white text-black dark:text-white"
            className="text-neutrals-gray-3 dark:text-neutrals-gray-5 hover:text-neutrals-gray-3 dark:hover:text-neutrals-gray-7 border-b-2 border-transparent hover:border-black dark:hover:border-white"
          >
            Dashboard
          </NavLink>
        </li>}
        {!hide && (<li className="block text-sm px-2 py-4 hover:bg-primary-over  hover:text-black transition duration-300">
          <NavLink
            href="/launch"
            activeClassName="dark:border-white border-black text-black dark:text-white"
            className="text-sm border border-regent-gray text-neutrals-gray-5 hover:text-neutrals-gray-1 dark:hover:text-neutrals-gray-7 p-2 duration-200"
          >
            Launch an organisation
          </NavLink>
        </li>)}
        <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
          <ConnectButton showBalance={false} />
        </li>
      </ul>
    </div>
  );
}
