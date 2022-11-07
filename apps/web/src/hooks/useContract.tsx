import { wrapContract } from "@opengsn/provider/dist/WrapContract";
import { PAYMASTER_ADDRESS, SB_FACTORY_ADDRESS } from "constants/addresses";
import { DesocManager } from "constants/types/DesocManager";
import { DEFAULT_CHAIN, RPC_URLS } from "constants/web3";
import { Contract, ethers } from "ethers";
import { useNetwork, useProvider, useSigner } from "wagmi";
import DesocManagerInterface from "../constants/abis/DesocManager.json";
import DesocInterface from "../constants/abis/Desoc.json";
import { Desoc } from "constants/types/Desoc";
import { useEffect, useState } from "react";

const getDefaultProvider = (chainId?: number) =>
  new ethers.providers.JsonRpcProvider(RPC_URLS[chainId ?? DEFAULT_CHAIN]);

export const useDefaultProvider = () => {
  const { chain } = useNetwork();
  return getDefaultProvider(chain?.id);
};

export const useFactoryContract = (): DesocManager | undefined => {
  const [contract, setContract] = useState<DesocManager>();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const address = SB_FACTORY_ADDRESS[chain?.id ?? DEFAULT_CHAIN];

  useEffect(() => {
    if (!address) return;
    const c = new ethers.Contract(
      address,
      DesocManagerInterface.abi,
      signer ?? provider ?? getDefaultProvider()
    );
    setContract(c as DesocManager);
  }, [address, provider, signer]);

  return contract;
};

export const useWrapContract = () => {
  return <T extends Contract>(contract: T, chainId: number) => {
    // console.log("paymaster ", PAYMASTER_ADDRESS[chainId])
    return wrapContract(contract, {
      paymasterAddress: PAYMASTER_ADDRESS[chainId],
      performDryRunViewRelayCall: false,
      loggerConfiguration: {
        logLevel: "debug",
      },
    });
  };
};

export const useTokenContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  return (address: string): Desoc => {
    const c = new ethers.Contract(
      address,
      DesocInterface.abi,
      signer ?? provider ?? getDefaultProvider()
    );
    return c.connect(signer || provider) as Desoc;
  };
};
