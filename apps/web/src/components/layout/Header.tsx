import { ConnectButton } from "@rainbow-me/rainbowkit";
import TransactionHint from "components/TransactionStatus/TransactionHint";
import DesocLogo from "components/UI/DesocLogo";
import NavLink from "components/UI/NavLink";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Header() {
  const { isConnected } = useAccount();
  const [hide, setHidden] = useState(true);

  useEffect(() => {
    setHidden(!isConnected);
  }, [isConnected]);

  return (
    <div className="container mx-auto flex items-center justify-start p-4">
      <div className="grow flex items-center justify-start gap-5">
        <DesocLogo />
        <NavLink href="/" activeClassName="text-white border-b-2 border-white" className="border-b-2 border-transparent hover:border-white">
          Explore
        </NavLink>
      </div>
      <div className="flex gap-5 items-center">
        <TransactionHint />
        {!hide && (
          <NavLink href="/launch" activeClassName="border-white bg-white text-black" className="text-sm border border-regent-gray hover:border-white hover:bg-white hover:text-black p-1 duration-200">
            Launch an organisation
          </NavLink>
        )}
        <div>
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </div>
  );
}
