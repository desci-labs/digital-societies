import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNetwork, useProvider } from "wagmi";
import useIsWindowVisible from "./useIsWindowVisible";

const MISSING_PROVIDER = Symbol();

export const blockNumberContext = createContext<
  { value?: number } | typeof MISSING_PROVIDER
>(MISSING_PROVIDER);

export function useBlockNumberContext() {
  const context = useContext(blockNumberContext);

  if (!context) {
    throw new Error(
      "BlockNumber hooks accessed outside of the <BlockNumberProvider>"
    );
  }

  if (context === MISSING_PROVIDER) {
    throw new Error("Web3Provider library not initialized!!!");
  }

  return context;
}

export default function useBlockNumber(): number | undefined {
  return useBlockNumberContext().value;
}

export function BlockNumberProvider({ children }: { children: ReactNode }) {
  const { chain } = useNetwork();
  const library = useProvider();
  
  const [{ chainId, block }, setChainBlock] = useState<{
    chainId?: number;
    block?: number;
  }>({ chainId: chain?.id });

  const onBlock = useCallback(
    (block: number) => {
      setChainBlock((chainBlock) => {
        if (chainBlock.chainId === chain?.id) {
          if (!chainBlock.block || chainBlock.block < block) {
            return { chainId: chain?.id, block };
          }
        }
        return chainBlock;
      });
    },
    [chain?.id]
  );

  const windowVisible = useIsWindowVisible();
  useEffect(() => {
    if (library && chain?.id && windowVisible) {
      setChainBlock((chainBlock) =>
        chainBlock.chainId === chain?.id
          ? chainBlock
          : { chainId: chain?.id }
      );

      library
        .getBlockNumber()
        .then(onBlock)
        .catch((error) => {
          console.error(
            `Error fetching block number for chainId ${chain?.id}`,
            error
          );
        });

      library.on("block", onBlock);
    }
    return () => {
      library?.removeListener("block", onBlock);
    };
  }, [library, chain?.id, windowVisible, onBlock]);

  const value = useMemo(
    () => ({ value: chain?.id === chainId ? block : undefined }),
    [chainId, chain?.id, block]
  );
  return (
    <blockNumberContext.Provider value={value}>
      {children}
    </blockNumberContext.Provider>
  );
}
