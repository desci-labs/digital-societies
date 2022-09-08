import { Metadata } from "components/Transactors/types";
import useLocalStorageState from "hooks/useLocalstorage";
import { createContext, useContext } from "react";
import CredentialUpdater from "./updater";

export type Credential = { id: number; mintedBy: string; cid: string; metadata: Metadata; address: string, dateCreated: number }
export type CredentialMap = Record<string, Credential[]>;
export type CredentialState = { data: CredentialMap, isLoading: boolean };

const initialState: CredentialState = { data: {}, isLoading: true };

export const getContext = createContext<CredentialState>(initialState);
export const setContext = createContext({
  setCredentials: (_value: CredentialMap) => { },
});

export default function CredentialProvider({ children }: any) {
  const [state, setState] = useLocalStorageState<CredentialState>(
    `DESCILabs_Credentials`,
    initialState
  );

  const setCredentials = (payload: CredentialMap) => {
    setState((prevState) => ({ data: { ...prevState.data, ...payload }, isLoading: false }));
  };

  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={{ setCredentials }}>
        <CredentialUpdater />
        {children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

export const useGetCredentials = () => useContext(getContext);
export const useSetCredentials = () => useContext(setContext);

export function useGetCredential(address: string, id: number) {
  const { data } = useGetCredentials();
  return data[address]?.find(credential => credential.id === id);
}