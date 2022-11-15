import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CardContainer } from "components/UI/Index";
import { SUPPORTED_CHAIN_IDS } from "constants/chains";
import { PropsWithChildren } from "react";
import { useAccount, useNetwork } from "wagmi";

export default function NetworkGuard(props: PropsWithChildren) {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  if (isConnected && (!chain?.id || !SUPPORTED_CHAIN_IDS.includes(chain?.id)))
    return (
      <div className="h-104 w-full flex justify-center items-center">
        <CardContainer className="flex flex-col justify-center items-center gap-5 shadow-none w-88 py-10">
          <p>You are on the Wrong Network</p>
          <ConnectButton showBalance={false} label="switch network" />
        </CardContainer>
      </div>
    );

  return <>{props.children}</>;
}
