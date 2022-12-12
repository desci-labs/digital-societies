import { wrapContract } from "@opengsn/provider/dist/WrapContract";
import { PAYMASTER_ADDRESS, SB_FACTORY_ADDRESS } from "constants/addresses";
import { DEFAULT_CHAIN, RPC_URLS } from "constants/web3";
import { Contract, ethers } from "ethers";
import { useNetwork, useProvider, useSigner } from "wagmi";
import FactoryInterface from "../constants/abis/Factory.json";
import DesocInterface from "../constants/abis/Desoc.json";
import { Desoc } from "constants/types/Desoc";
import { useEffect, useState } from "react";
import { Factory } from "constants/types/Factory";

const getDefaultProvider = (chainId?: number) =>
  new ethers.providers.JsonRpcProvider(RPC_URLS[chainId ?? DEFAULT_CHAIN]);

export const useDefaultProvider = () => {
  const { chain } = useNetwork();
  return getDefaultProvider(chain?.id);
};

export const useFactoryContract = (): Factory | undefined => {
  const [contract, setContract] = useState<Factory>();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const provider = useProvider();
  const address = SB_FACTORY_ADDRESS[chain?.id ?? DEFAULT_CHAIN];

  useEffect(() => {
    if (!address) return;
    const c = new ethers.Contract(
      address,
      FactoryInterface.abi,
      signer ?? provider ?? getDefaultProvider(chain?.id)
    );
    setContract(c as Factory);
  }, [address, provider, signer, chain?.id]);

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
