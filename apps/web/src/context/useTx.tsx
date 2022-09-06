import { createContext, useContext, useState } from "react";

export type ActionTypes = "DeploySBT" | "UpdateSBT" | "IssueSBT";

export interface Tx {
  txInfo?: any;
  type?: ActionTypes | "none";
  message?: string;
}
const initialState: Tx = { txInfo: null, type: 'none' };
export const getContext = createContext<Tx>(initialState);
export const setContext = createContext({
  setTx: (tx: Tx) => { },
  reset: () => { },
});

export default function TransactionProvider({ children }: any) {
  // { txInfo: tx, type: "deposit | withdrawal" }
  const [tx, setVal] = useState<Tx>(initialState);

  const setTx = (tx: Tx) => {
    if (tx !== null) {
      setVal(tx);
    }
  };

  const reset = () => setVal(initialState);

  return (
    <getContext.Provider value={tx}>
      <setContext.Provider value={{ setTx, reset }}>{children}</setContext.Provider>
    </getContext.Provider>
  );
}

export const useGetTx = () => useContext(getContext);
export const useSetTx = () => useContext(setContext);
