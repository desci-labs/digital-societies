import { wrapContract } from "@opengsn/provider/dist/WrapContract";
import { PAYMASTER_ADDRESS, SB_FACTORY_ADDRESS } from "constants/addresses";
import { DesocManager } from "constants/types/DesocManager";
import { DEFAULT_CHAIN, RPC_URLS } from "constants/web3";
import { Contract, ethers } from "ethers";
import { useContract, useNetwork, useProvider, useSigner } from "wagmi";
import DesocManagerInterface from "../constants/abis/DesocManager.json";
import DesocInterface from "../constants/abis/Desoc.json";
import { Desoc } from "constants/types/Desoc";
import { Desoc__factory } from "constants/types/factories/Desoc__factory";
import { DesocManager__factory } from "constants/types/factories/DesocManager__factory";

export const useDefaultProvider = () => {
  const { chain } = useNetwork();
  const DEFAULT_PROVIDER = new ethers.providers.JsonRpcProvider(
    RPC_URLS[chain?.id ?? DEFAULT_CHAIN]
  );
  return DEFAULT_PROVIDER;
};

export const useFactoryContract = (): DesocManager | undefined => {
  // const library = useProvider();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  // const DEFAULT_PROVIDER = useDefaultProvider()
  const address = SB_FACTORY_ADDRESS[chain?.id ?? DEFAULT_CHAIN];

  try {
    // return DesocManager__factory.getContract(
    //   address!,
    //   DesocManagerInterface.abi,
    //   signer!
    //   ) as DesocManager;
    // return new ethers.Contract(address!, DesocManagerInterface.abi, signer!) as DesocManager
    return useContract({
      addressOrName: address,
      contractInterface: DesocManagerInterface.abi,
      signerOrProvider: signer,
    });
    } catch (e) {
      return undefined;
    }
};

export const useWrapContract = () => {
  return <T extends Contract>(contract: T, chainId: number) => {
    console.log("paymaster ", PAYMASTER_ADDRESS[chainId])
    return wrapContract(contract, {
      paymasterAddress: PAYMASTER_ADDRESS[chainId],
      performDryRunViewRelayCall: false,
      loggerConfiguration: {
        logLevel: "debug",
      },
    });
  }
};

export const useTokenContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  return (address: string): Desoc => {
    return Desoc__factory.getContract(
      address!,
      DesocInterface.abi,
      signer!
    ).connect(signer! || provider) as Desoc;
  };
};
