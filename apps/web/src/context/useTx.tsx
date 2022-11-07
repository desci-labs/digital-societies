import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

export type ActionTypes = "DeploySBT" | "UpdateSBT" | "IssueSBT";

export interface Tx {
  txHash?: string;
  type?: ActionTypes | "none";
  message?: string;
}
const initialState: Tx = { type: "none" };
export const getContext = createContext<Tx>(initialState);
export const setContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTx: (tx: Tx) => {},
  reset: () => {},
});

export default function TransactionProvider({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const [tx, setVal] = useState<Tx>(initialState);

  const setTx = (tx: Tx) => {
    if (tx !== null) {
      setVal(tx);
    }
  };

  const reset = () => setVal(initialState);

  return (
    <getContext.Provider value={tx}>
      <setContext.Provider value={{ setTx, reset }}>
        {children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

export const useGetTx = () => useContext(getContext);
export const useSetTx = () => useContext(setContext);
