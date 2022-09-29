import { ConnectButton } from "@rainbow-me/rainbowkit";
import TransactionHint from "components/TransactionStatus/TransactionHint";
import Button from "components/UI/Button/Index";
import DesocLogo from "components/UI/DesocLogo";
import NavLink from "components/UI/NavLink";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useMobileMenu, useSetMobileMenu } from "./useAppMenu";

export default function Header() {
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <nav className="container mx-auto flex items-center justify-start p-4 relative">
      <div className="grow flex items-center justify-start gap-5">
        <DesocLogo />
        <NavLink
          href="/"
          activeClassName="text-white border-b-2 border-white"
          className="hidden sm:block border-b-2 border-transparent hover:border-white"
        >
          Explore
        </NavLink>
      </div>
      <div className="flex gap-5 items-center">
        <TransactionHint />
        {!hide && (
          <NavLink
            href="/launch"
            activeClassName="border-white text-white"
            className="text-sm border border-regent-gray hover:border-white hover:bg-white hover:text-black p-2 duration-200"
          >
            Launch an organisation
          </NavLink>
        )}
        <div className="hidden sm:block">
          <ConnectButton showBalance={false} />
        </div>
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
        <svg
          className="w-6 h-6 text-gray-500 hover:text-white"
          x-show="!showMenu"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
    </div>
  );
}

function MobileMenu() {
  const opened = useMobileMenu();
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <div
      className={`z-50 pointer-none opacity-0 sm:hidden mobile-menu absolute left-0 right-0 top-[100%] bg-white transition-all overflow-hidden ${opened ? "pointer-click opacity-100" : "h-0"
        }`}
    >
      <ul className="responsive-nav transition-opacity duration-500">
        <li className="block text-sm px-2 py-4 hover:bg-primary-over hover:text-black transition duration-300">
          <NavLink
            href="/"
            activeClassName="t border-b-2 border-white"
            className="border-b-2 border-transparent hover:border-white text-neutrals-gray-1 hover:text-black"
          >
            Explore
          </NavLink>
        </li>
        {!hide && (<li className="block text-sm px-2 py-4 hover:bg-primary-over  hover:text-black transition duration-300">

          <NavLink
            href="/launch"
            activeClassName="border-white text-white"
            className="text-sm text-neutrals-gray-1 border hover:border-neutrals-gray-1 hover:bg-white hover:text-black p-1 duration-200"
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
