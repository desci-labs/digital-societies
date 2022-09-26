import { ConnectButton } from "@rainbow-me/rainbowkit";
import TransactionHint from "components/TransactionStatus/TransactionHint";
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
      <div className="grow flex justify-start gap-10">
        <NavLink href="/" activeClassName="text-dark">
          Explore
        </NavLink>
        {!hide && (
          <NavLink href="/launch" activeClassName="text-dark">
            Launch an organisation
          </NavLink>
        )}
      </div>
      <TransactionHint />
      <div>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
}
