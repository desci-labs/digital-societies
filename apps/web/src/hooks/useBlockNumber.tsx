import { DEFAULT_CHAIN } from "constants/web3";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useBlockNumber as useWagmiBlockNumber } from "wagmi";

export const blockNumberContext = createContext<{ value: number | undefined }>({
  value: undefined,
});

export function useBlockNumberContext() {
  const context = useContext(blockNumberContext);

  if (!context) {
    throw new Error(
      "BlockNumber hooks accessed outside of the <BlockNumberProvider>"
    );
  }

  return context;
}

export default function useBlockNumber(): number | undefined {
  return useBlockNumberContext().value;
}

export function BlockNumberProvider({ children }: { children: ReactNode }) {
  const [block, setBlocks] = useState<{ value: number | undefined }>({
    value: undefined,
  });
  useWagmiBlockNumber({
    chainId: DEFAULT_CHAIN,
    onBlock: (block) => {
      setBlocks(() => ({ value: block }));
    },
  });

  const value = useMemo(() => block, [block]);

  return (
    <blockNumberContext.Provider value={value}>
      {children}
    </blockNumberContext.Provider>
  );
}
