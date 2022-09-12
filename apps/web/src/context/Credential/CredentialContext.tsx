import { Metadata } from "components/Transactors/types";
import useLocalStorageState from "hooks/useLocalStorageState";
import { createContext, useContext } from "react";
import TokenUpdater, { CredentialToken, CredentialToTokenMap } from "./TokenUpdater";
import CredentialUpdater from "./updater";

export type Credential = {
  id: number;
  mintedBy: string;
  cid: string;
  metadata: Metadata;
  address: string;
  dateCreated: number;
  pending?: boolean;
  tokens: CredentialToken;
};
export type CredentialMap = Record<string, Credential[]>;

export type CredentialState = { credentials: CredentialMap; isLoading: boolean, tokens: CredentialToTokenMap };

const initialState: CredentialState = { credentials: {}, tokens: {}, isLoading: true };

export const getContext = createContext<CredentialState>(initialState);
export const setContext = createContext({
  setCredentials: (_value: CredentialMap) => {},
  setTokens: (_value: CredentialToTokenMap) => {},
});

export default function CredentialProvider({ children }: any) {
  const [state, setState] = useLocalStorageState<CredentialState>(
    `DESCILabs_Credentials`,
    initialState
  );
  const setCredentials = (payload: CredentialMap) => {
    setState((prevState) => ({
      ...prevState,
      credentials: { ...prevState.credentials, ...payload },
      isLoading: false,
    }));
  };

  const setTokens = (payload: CredentialToTokenMap) => {
    setState((prevState) => ({
      ...prevState,
      tokens: { ...prevState.tokens, ...payload },
    }));
  }

  return (
    <getContext.Provider value={state}>
      <setContext.Provider value={{ setCredentials, setTokens }}>
        <CredentialUpdater />
        <TokenUpdater />
        {children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

export const useGetCredentials = () => useContext(getContext);
export const useSetCredentials = () => useContext(setContext);

export function useGetCredential(address: string, id: number) {
  const { credentials } = useGetCredentials();
  return credentials[address]?.find((credential) => credential.id === id);
}

export function useGetTokens(address: string) {
  const { tokens } = useGetCredentials();
  return tokens[address] ?? [];
}

export function useGetCredentialTokens(address: string, id: number) {
  const { tokens } = useGetCredentials();
  return tokens[address]?.filter((token) => token.credential === id);
}
